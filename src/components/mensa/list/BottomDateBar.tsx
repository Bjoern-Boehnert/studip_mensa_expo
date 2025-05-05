import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { addDays, format, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { useDebounce } from "@/src/hooks/useDebounce";
import { DatePickerModal } from "react-native-paper-dates";

interface Props {
	initialDate: Date;
	onChange: (date: Date) => void;
	handleSwitch: () => void;
}

export const BottomDateBar: React.FC<Props> = ({ initialDate, onChange, handleSwitch }) => {
	const { colors } = useTheme();
	const [date, setDate] = useState(initialDate);
	const [visible, setVisible] = useState(false);
	const debouncedDate = useDebounce(date, 300);

	useEffect(() => {
		onChange(debouncedDate);
	}, [debouncedDate, onChange]);

	const formattedDate = useMemo(() => format(date, "EEE, dd.MM.yyyy", { locale: de }), [date]);
	const isPrevDisabled = date <= initialDate;

	const onPrev = useCallback(() => setDate((prev) => subDays(prev, 1)), []);
	const onNext = useCallback(() => setDate((prev) => addDays(prev, 1)), []);
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
		<View style={[styles.outerContainer, { borderColor: colors.outline }]}>
			<IconButton icon="swap-horizontal" size={28} onPress={handleSwitch} />
			<Card mode="outlined" style={[styles.card, { borderColor: colors.outline }]}>
				<View style={styles.innerRow}>
					<Text variant="titleSmall" style={[styles.date, { color: colors.primary }]} onPress={showDatePicker}>
						{formattedDate}
					</Text>
					<IconButton icon="chevron-left" size={28} onPress={onPrev} disabled={isPrevDisabled} />
					<IconButton icon="chevron-right" size={28} onPress={onNext} />
				</View>
			</Card>
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
				validRange={{
					startDate: initialDate,
				}}
			/>
		</View>
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
