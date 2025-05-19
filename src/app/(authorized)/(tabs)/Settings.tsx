import { Button, Text, useTheme } from "react-native-paper";
import React from "react";
import { router, useFocusEffect } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useStoredAttributes } from "@/src/hooks/mensa/attributes/useStoredAttributes";
import { useThemeMode } from "@/src/providers/CustomThemeProvider";

export default function Settings() {
	const { colors } = useTheme();
	const { attributes, clear, reload } = useStoredAttributes();
	const { toggleTheme, mode } = useThemeMode();

	useFocusEffect(() => {
		void reload();
	});

	return (
		<View style={styles.container}>
			<View style={styles.section}>
				<Text variant="titleSmall" style={styles.sectionTitle}>
					Mensa-Einstellungen
				</Text>
				<Button
					mode="outlined"
					onPress={() => router.push("/AttributeFilterSettings")}
					style={styles.button}
				>
					Attribute filtern
				</Button>
				<Text variant="bodySmall" style={[styles.textHint, { color: colors.onSurfaceVariant }]}>
					Gerichte mit den ausgewählten Attributen werden rot gekennzeichnet.
				</Text>
				<Button
					mode="outlined"
					onPress={clear}
					style={styles.button}
					disabled={attributes.length === 0}
				>
					Attribute-Filter zurücksetzen
				</Button>
			</View>

			<View style={styles.section}>
				<Text variant="titleSmall" style={styles.sectionTitle}>
					App-Einstellungen
				</Text>
				<Button
					icon={mode === "dark" ? "weather-night" : "weather-sunny"}
					mode="outlined"
					onPress={toggleTheme}
					style={styles.button}
				>
					{mode === "dark" ? "Dunkel" : "Hell"}
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		gap: 32,
	},
	section: {
		gap: 16,
	},
	sectionTitle: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	button: {
		borderRadius: 8,
	},
	textHint: {
		marginTop: 4,
		textAlign: "center",
	},
});
