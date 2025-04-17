import { Appbar, Button, Text, useTheme } from "react-native-paper";
import React from "react";
import { useAuthSession } from "@/src/providers/AuthProvider";
import { router } from "expo-router";

export default function Settings() {
	const { colors } = useTheme();
	const { signOut } = useAuthSession();

	const logout = () => {
		signOut();
	};

	return (
		<>
			<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
				<Appbar.Content title="Einstellungen" />
				<Appbar.Action icon="logout" onPress={logout} />
			</Appbar.Header>
			<Button mode="outlined" onPress={() => router.push("/AttributeFilter")} style={{ margin: 16 }}>
				Attribute filtern
			</Button>
			<Text
				style={{
					color: colors.onSurfaceVariant,
					fontSize: 12,
					textAlign: "center",
				}}
			>
				Gerichte mit den ausgewählten Attribute werden rot gekennzeichnet.
			</Text>
		</>
	);
}
