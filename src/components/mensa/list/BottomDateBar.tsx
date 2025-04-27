import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { addDays, format, subDays } from "date-fns";
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

	return (
		<View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.outline }]}>
			<Text variant="bodyMedium">{formattedDate}</Text>
			<IconButton icon="chevron-left" onPress={onPrev} />
			<IconButton icon="chevron-right" onPress={onNext} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		padding: 8,
		borderTopWidth: 1,
	},
});
