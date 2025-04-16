import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function useLoadAssets() {
	const [hasLoadedFonts, loadingFontsError] = useFonts({
		SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (loadingFontsError) throw loadingFontsError;
	}, [loadingFontsError]);

	useEffect(() => {
		const initialize = async () => {
			if (hasLoadedFonts) {
				await SplashScreen.hideAsync();
			}
		};

		void initialize();
	}, [hasLoadedFonts]);
	return { isLoaded: hasLoadedFonts };
}
