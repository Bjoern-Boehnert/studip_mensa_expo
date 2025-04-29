import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { addDays, format, subDays } from "date-fns";
import { de } from "date-fns/locale";
import { useDebounce } from "@/src/hooks/useDebounce";
import { LinearGradient } from "expo-linear-gradient";

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

	const onPrev = () => setDate((prev) => subDays(prev, 1));
	const onNext = () => setDate((prev) => addDays(prev, 1));
	const formattedDate = format(date, "EEE, dd.MM.yyyy", { locale: de });

	return (
		<View style={[styles.outerContainer, {borderColor: colors.outline}]}>
			<Card mode="outlined" style={[styles.card, { borderColor: colors.outline }]}>
				<View style={styles.container}>
					<Text variant="titleSmall" style={{ flex: 1, textAlign: "center" }}>
						{formattedDate}
					</Text>
					<IconButton icon="chevron-left" size={28} onPress={onPrev} />
					<IconButton icon="chevron-right" size={28} onPress={onNext} />
				</View>
			</Card>
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
});
