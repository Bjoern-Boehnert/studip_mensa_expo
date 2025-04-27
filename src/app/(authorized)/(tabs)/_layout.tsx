import { Tabs } from "expo-router";
import { ReactNode } from "react";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout(): ReactNode {
	const { colors } = useTheme();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarLabelPosition: "below-icon",
				tabBarActiveTintColor: colors.primary,
				tabBarStyle: {
					backgroundColor: colors.primaryContainer,
				},
				tabBarActiveBackgroundColor: colors.primaryContainer,

			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: "Mensa",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="restaurant" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="Settings"
				options={{
					tabBarLabel: "Einstellungen",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="settings" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="Schedule"
				options={{
					tabBarLabel: "Stundenplan",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
