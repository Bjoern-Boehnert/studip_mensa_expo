import { Button, Text, useTheme } from "react-native-paper";
import React from "react";
import { router } from "expo-router";
import { AppHeader } from "@/src/components/AppHeader";

export default function Settings() {
	const { colors } = useTheme();

	return (
		<>
			<AppHeader title="Einstellungen" />
			<Button mode="outlined" onPress={() => router.push("/AttributeFilter")} style={{ margin: 16, borderRadius: 0 }}>
				Attribute filtern
			</Button>
			<Text
				variant="bodySmall"
				style={{
					marginHorizontal: 16,
					color: colors.onSurfaceVariant,
				}}
			>
				Gerichte mit den ausgewählten Attribute werden rot gekennzeichnet.
			</Text>
		</>
	);
}
