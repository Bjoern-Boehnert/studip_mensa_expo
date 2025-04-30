import { Slot } from "expo-router";
import AuthProvider from "@/src/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomThemeProvider } from "@/src/providers/CustomThemeProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
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
