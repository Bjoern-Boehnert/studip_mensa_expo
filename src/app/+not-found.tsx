import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function NotFoundScreen() {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.onBackground,
			justifyContent: "center",
			alignItems: "center",
		},

		button: {
			fontSize: 20,
			textDecorationLine: "underline",
			color: colors.background,
		},
	});

	return (
		<>
			<Stack.Screen options={{ title: "Oops! Nicht gefunden" }} />
			<View style={styles.container}>
				<Link href="/" style={styles.button}>
					Zurück zum Home-Bildschirm
				</Link>
			</View>
		</>
	);
}

