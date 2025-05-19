import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { Colors } from "../constants/Colors";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { useAsyncStorage } from "@/src/hooks/useAsyncStorage";

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
	const colorScheme = useColorScheme();
	const { getItem, setItem } = useAsyncStorage<"light" | "dark">("theme");

	useEffect(() => {
		async function setTheme() {
			const storedThemeValue = await getItem();
			if (storedThemeValue) {
				setMode(storedThemeValue);
			}
		}

		void setTheme();
	}, [colorScheme, getItem]);

	const [mode, setMode] = useState<"light" | "dark">(colorScheme === "dark" ? "dark" : "light");
	const toggleTheme = () => {
		setMode((m) => {
			const theme = m === "light" ? "dark" : "light";
			void setItem(theme);
			return theme;
		});
	};
	const isDark = mode === "dark";
	const theme = useMemo(() => (isDark ? CombinedDarkTheme : CombinedLightTheme), [isDark]);

	return (
		<ThemeModeContext.Provider value={{ mode, toggleTheme }}>
			<PaperProvider theme={theme}>
				<NavigationThemeProvider value={theme as any}>
					<StatusBar style={isDark ? "dark" : "light"} />
					{children}
				</NavigationThemeProvider>
			</PaperProvider>
		</ThemeModeContext.Provider>
	);
};

export const useThemeMode = () => useContext(ThemeModeContext);
