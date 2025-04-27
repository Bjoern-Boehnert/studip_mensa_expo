import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";

function getMensaName(locationId: string): { title: string; info: string } {
	switch (locationId) {
		case "2":
			return {
				title: "Uhlhornsweg",
				info: "11:30 - 14:15 Uhr (Im Semester).\n11:30 - 14:00 Uhr (Vorlesungsfreie Zeit).",
			};
		case "3":
			return { title: "Wechloy", info: "11:30 - 14:00 Uhr" };
		default:
			return { title: "Unbekannte Mensa", info: "" };
	}
}

export const FoodListHeader = ({ locationId }: { locationId: string }) => {
	const { colors } = useTheme();
	const mensa = getMensaName(locationId);

	return (
		<View style={[styles.container, { backgroundColor: colors.primary }]}>
			<Text
				variant="titleMedium"
				style={[styles.title, { color: colors.onPrimary }]}
			>
				{mensa.title}
			</Text>
			<Text
				variant="bodySmall"
				style={{ color: colors.onPrimary }}
			>
				{mensa.info}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 12,
		marginBottom: 16,
	},
	title: {
		marginBottom: 4,
	},
});
