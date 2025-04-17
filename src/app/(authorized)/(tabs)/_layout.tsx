import { Tabs } from "expo-router";
import { ReactNode } from "react";
import { useTheme } from "react-native-paper";

export default function TabLayout(): ReactNode {
	const { colors } = useTheme();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarLabelPosition: "beside-icon",
				tabBarLabelStyle: {
					fontWeight: "bold",
					fontSize: 15,
				},
				tabBarActiveTintColor: colors.primary,
				tabBarStyle: {
					backgroundColor: colors.background,
				},
				tabBarActiveBackgroundColor: colors.background,
				tabBarIconStyle: { display: "none" },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: "Mensa",
				}}
			/>
			<Tabs.Screen
				name="Settings"
				options={{
					tabBarLabel: "Einstellungen",
				}}
			/>
		</Tabs>
	);
}
