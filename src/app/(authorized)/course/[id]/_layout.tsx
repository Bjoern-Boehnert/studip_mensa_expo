import { Stack } from "expo-router";
import React, { ReactNode } from "react";
import { useTheme } from "react-native-paper";

export default function RootLayout(): ReactNode {
	const { colors } = useTheme();

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.primaryContainer,
				},
				headerShown: false,
				animation: "none",
			}}
		>
			<Stack.Screen
				name="topfolder"
				options={{
					title: "Dokumente",
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name="index"
				options={{
					title: "Modul",
					headerShown: true,
				}}
			/>
		</Stack>
	);
}
