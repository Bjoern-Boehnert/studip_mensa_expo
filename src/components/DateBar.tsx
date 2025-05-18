import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { addDays, format, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { useDebounce } from "../hooks/useDebounce";
import { DatePickerModal } from "react-native-paper-dates";

type ValidRange = {
	startDate?: Date;
	endDate?: Date;
	disabledDates?: Date[];
};

interface Props {
	initialDate: Date;
	onChange: (date: Date) => void;
	validRange?: ValidRange;
	enableDatePicker?: boolean;
}

export const DateBar: React.FC<Props> = ({ initialDate, onChange, enableDatePicker, validRange }) => {
	const { colors } = useTheme();
	const [date, setDate] = useState(initialDate);
	const [visible, setVisible] = useState(false);
	const debouncedDate = useDebounce(date, 300);

	useEffect(() => {
		onChange(debouncedDate);
	}, [debouncedDate, onChange]);

	const formattedDate = useMemo(() => format(date, "EEE, dd.MM.yyyy", { locale: de }), [date]);
	const isPrevDisabled = validRange && validRange.startDate ? date <= validRange.startDate : date <= initialDate;
	const isNextDisabled = validRange && validRange.endDate ? date >= validRange.endDate : false;

	const onLeft = useCallback(() => setDate((date) => subDays(date, 1)), []);
	const onRight = useCallback(() => setDate((date) => addDays(date, 1)), []);
	const showDatePicker = useCallback(() => setVisible(true), []);
	const hideDatePicker = useCallback(() => setVisible(false), []);
	const handleDateChange = useCallback(
		(newDate: Date) => {
			setDate(newDate);
			hideDatePicker();
		},
		[hideDatePicker],
	);

	return (
		<>
			<Card mode="outlined" style={[styles.card, { borderColor: colors.outline }]}>
				<View style={styles.innerRow}>
					<Text
						variant="titleSmall"
						style={[styles.date, { color: enableDatePicker ? colors.primary : colors.onBackground }]}
						onPress={enableDatePicker ? showDatePicker : undefined}
					>
						{formattedDate}
					</Text>
					<IconButton icon="chevron-left" size={28} onPress={onLeft} disabled={isPrevDisabled} />
					<IconButton icon="chevron-right" size={28} onPress={onRight} disabled={isNextDisabled} />
				</View>
			</Card>
			{enableDatePicker && (
				<DatePickerModal
					saveLabel="Speichern"
					allowEditing={false}
					label="Auswahl"
					disableWeekDays={[0, 6]}
					mode="single"
					visible={visible}
					date={date}
					onDismiss={hideDatePicker}
					onConfirm={({ date: newDate }) => handleDateChange(newDate as Date)}
					locale="de"
					validRange={{ ...validRange }}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		borderTopWidth: 2,
	},
	card: {
		flex: 1,
		marginHorizontal: 8,
		borderRadius: 12,
	},
	innerRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
	},
	date: {
		flex: 1,
		textAlign: "center",
	},
});
