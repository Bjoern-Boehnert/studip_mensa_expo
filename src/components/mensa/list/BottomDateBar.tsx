import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { addDays, format, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { useDebounce } from "@/src/hooks/useDebounce";
import { DatePickerModal } from "react-native-paper-dates";

interface Props {
	initialDate: Date;
	onChange: (date: Date) => void;
}

export const BottomDateBar: React.FC<Props> = ({ initialDate, onChange }) => {
	const { colors } = useTheme();
	const [date, setDate] = useState(initialDate);
	const [visible, setVisible] = useState(false);
	const debouncedDate = useDebounce(date, 300);

	useEffect(() => {
		onChange(debouncedDate);
	}, [debouncedDate, onChange]);

	const formattedDate = format(date, "EEE, dd.MM.yyyy", { locale: de });

	const onPrev = () => setDate((prev) => subDays(prev, 1));
	const onNext = () => setDate((prev) => addDays(prev, 1));

	const showDatePicker = () => setVisible(true);
	const hideDatePicker = () => setVisible(false);

	const handleDateChange = (newDate: Date) => {
		setDate(newDate);
		hideDatePicker();
	};

	return (
		<View style={[styles.outerContainer, { borderColor: colors.outline }]}>
			<Card mode="outlined" style={[styles.card, { borderColor: colors.outline }]}>
				<View style={styles.container}>
					<Text variant="titleSmall" style={[styles.date, { color: colors.primary }]} onPress={showDatePicker}>
						{formattedDate}
					</Text>

					<IconButton icon="chevron-left" size={28} onPress={onPrev} />
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
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 48,
		marginVertical: 12,
		borderRadius: 12,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
	},
	outerContainer: {
		borderTopWidth: 2,
	},
	date: {
		flex: 1,
		textAlign: "center",
	},
});
