import { Button, Text, useTheme } from "react-native-paper";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useStoredAttributes } from "@/src/hooks/mensa/attributes/useStoredAttributes";

export default function Settings() {
	const { colors } = useTheme();
	const { attributes, clear, reload } = useStoredAttributes();

	useEffect(() => {
		void reload();
	}, [attributes, reload]);

	return (
		<View style={styles.container}>
			<View>
				<Button mode="outlined" onPress={() => router.push("/AttributeFilterSettings")} style={styles.button}>
					Attribute filtern
				</Button>
				<Text variant="bodySmall" style={[styles.text, { color: colors.onSurfaceVariant }]}>
					Gerichte mit den ausgewählten Attributen werden rot gekennzeichnet.
				</Text>
			</View>
			<Button mode="outlined" onPress={clear} style={[styles.button]} disabled={attributes.length === 0}>
				Attribute Filter zurücksetzen
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		gap: 20,
	},
	button: {
		borderRadius: 8,
	},
	text: {
		marginTop: 8,
		textAlign: "center",
	},
});
