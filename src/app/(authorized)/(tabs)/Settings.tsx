import { Button, Text, useTheme } from "react-native-paper";
import React from "react";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";
import { StyleSheet, View } from "react-native";

export default function Settings() {
	const { colors } = useTheme();

	return (
		<>
			<AppHeader title="Einstellungen" />
			<View style={styles.container}>
				<Button
					mode="outlined"
					onPress={() => router.push("/AttributeFilterSettings")}
					style={styles.button}
				>
					Attribute filtern
				</Button>
				<Text variant="bodySmall" style={[styles.text, { color: colors.onSurfaceVariant }]}>
					Gerichte mit den ausgewählten Attributen werden rot gekennzeichnet.
				</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	button: {
		borderRadius: 8,
	},
	text: {
		marginTop: 8,
		textAlign: "center",
	},
});
