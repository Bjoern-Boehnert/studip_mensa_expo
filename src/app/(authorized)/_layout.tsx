import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import React, { ReactNode } from "react";
import { useAuthentication } from "@/src/providers/AuthProvider";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function RootLayout(): ReactNode {
	const { token, isLoading } = useAuthentication();
	const { colors } = useTheme();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator animating size="large" />
			</View>
		);
	}

	if (!token?.current) {
		return <Redirect href="/login" />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen
				name="AttributeFilterSettings"
				options={{
					title: "Filter Einstellungen",
					headerShown: true,
					headerStyle: {
						backgroundColor: colors.primaryContainer,
					},
				}}
			/>
		</Stack>
	);
}
