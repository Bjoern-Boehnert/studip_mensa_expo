import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { format, addDays, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { useDebounce } from "@/src/hooks/useDebounce";


interface Props {
	initialDate: Date;
	onChange: (date: Date) => void;
}

export const BottomDateBar: React.FC<Props> = ({ initialDate, onChange }) => {
	const { colors } = useTheme();
	const [date, setDate] = useState(initialDate);
	const debouncedDate = useDebounce(date, 300);

	useEffect(() => {
		onChange(debouncedDate);
	}, [debouncedDate, onChange]);

	const onPrev = () => {
		setDate((prev) => subDays(prev, 1));
	};

	const onNext = () => {
		setDate((prev) => addDays(prev, 1));
	};

	const formattedDate = format(date, "EEE, dd.MM.yyyy", { locale: de });

	const styles = StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			padding: 8,
			borderTopWidth: 1,
			borderColor: colors.onSurface,
		},
		date: {
			color: colors.onSurface,
			fontSize: 16,
		},
	});

	return (
		<View style={styles.container}>
			<IconButton icon="chevron-left" onPress={onPrev} />
			<Text style={styles.date}>{formattedDate}</Text>
			<IconButton icon="chevron-right" onPress={onNext} />
		</View>
	);
};
