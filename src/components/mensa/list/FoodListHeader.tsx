import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

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
		<Card style={[styles.container, { backgroundColor: colors.inversePrimary }]}>
			<Card.Title title={mensa.title} />
			<Card.Content>
				<Text>{mensa.info}</Text>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 12,
	},
	title: {},
});
