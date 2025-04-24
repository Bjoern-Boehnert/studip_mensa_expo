import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { Colors } from "../constants/Colors";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const ThemeModeContext = createContext<{
	mode: "light" | "dark";
	toggleTheme: () => void;
}>({
	mode: "light",
	toggleTheme: () => {},
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<"light" | "dark">("light");
	const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));
	const isDark = mode === "dark";
	const theme = useMemo(() => (isDark ? CombinedDarkTheme : CombinedLightTheme), [isDark]);

	return (
		<ThemeModeContext.Provider value={{ mode, toggleTheme }}>
			<PaperProvider theme={theme}>
				<NavigationThemeProvider value={theme as any}>
					<StatusBar style={isDark ? "light" : "dark"} />
					{children}
				</NavigationThemeProvider>
			</PaperProvider>
		</ThemeModeContext.Provider>
	);
};

export const useThemeMode = () => useContext(ThemeModeContext);
