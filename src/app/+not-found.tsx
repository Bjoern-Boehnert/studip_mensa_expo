import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Button, useTheme } from "react-native-paper";

export default function NotFoundScreen() {
	const { colors } = useTheme();
	const { push } = useRouter();

	return (
		<>
			<Stack.Screen options={{ title: "Oops! Nicht gefunden" }} />
			<View
				style={{
					flex: 1,
					backgroundColor: colors.background,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Button icon="home" mode="contained" onPress={() => push("/")}>
					Zurück zum Home-Bildschirm
				</Button>
			</View>
		</>
	);
}
