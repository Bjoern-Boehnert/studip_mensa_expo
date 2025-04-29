import { Tabs } from "expo-router";
import React, { ReactNode } from "react";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/src/components/AppHeader";

export default function TabLayout(): ReactNode {
	const { colors } = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarLabelPosition: "below-icon",
				tabBarActiveTintColor: colors.primary,
				tabBarStyle: {
					backgroundColor: colors.background,
				},
				tabBarActiveBackgroundColor: colors.background,
				header: ({ options, route }) => (
					<AppHeader title={options.title ?? route.name} />
				),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Mensa",
					tabBarIcon: (props) => <Ionicons name="restaurant" {...props} />,
				}}
			/>
			<Tabs.Screen
				name="Settings"
				options={{
					title: "Einstellungen",
					tabBarIcon: (props) => <Ionicons name="settings" {...props} />,
				}}
			/>
			<Tabs.Screen
				name="Schedule"
				options={{
					title: "Stundenplan",
					tabBarIcon: (props) => <Ionicons name="calendar" {...props} />,
				}}
			/>
		</Tabs>
	);
}
