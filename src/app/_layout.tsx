import { Slot } from "expo-router";
import { useLoadAssets } from "@/src/hooks/use-load-assets";
import AuthProvider from "@/src/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomThemeProvider } from "@/src/providers/CustomThemeProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
	const { isLoaded } = useLoadAssets();
	if (!isLoaded) return null;
	return <RootLayoutNavigation />;
}

function RootLayoutNavigation() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<CustomThemeProvider>
					<Slot />
				</CustomThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
