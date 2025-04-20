import { Slot } from "expo-router";
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";
import { useLoadAssets } from "@/src/hooks/use-load-assets";
import AuthProvider from "@/src/providers/AuthProvider";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const queryClient = new QueryClient();

export default function RootLayout() {
	const { isLoaded } = useLoadAssets();
	if (!isLoaded) return null;
	return <RootLayoutNavigation />;
}

function RootLayoutNavigation() {
	//THEME
	const colorScheme = useColorScheme();
	const paperTheme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
	const isDark = colorScheme === "dark";

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<StatusBar style={isDark ? "light" : "dark"} />
				<PaperProvider theme={paperTheme}>
					<ThemeProvider value={paperTheme as any}>
						<Slot />
					</ThemeProvider>
				</PaperProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
