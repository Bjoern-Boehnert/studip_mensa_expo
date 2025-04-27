import { View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Button, Text, useTheme } from "react-native-paper";

export default function NotFoundScreen() {
	const { colors } = useTheme();
	const { push } = useRouter();

	return (
		<>
			<Stack.Screen options={{ title: "Oops! Nicht gefunden" }} />
			<View style={[styles.container, { backgroundColor: colors.background }]}>
				<Text variant="headlineMedium" style={styles.text}>
					Seite nicht gefunden
				</Text>
				<Button
					icon="home"
					mode="contained"
					onPress={() => push("/")}
					style={styles.button}
				>
					Zurück zum Home-Bildschirm
				</Button>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	text: {
		marginBottom: 24,
		textAlign: "center",
	},
	button: {
		alignSelf: "center",
	},
});
