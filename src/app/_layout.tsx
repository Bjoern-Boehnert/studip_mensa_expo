import { Slot } from "expo-router";
import AuthProvider from "@/src/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomThemeProvider } from "@/src/providers/CustomThemeProvider";

import { de, registerTranslation } from "react-native-paper-dates";

const queryClient = new QueryClient();

// Register Locale for Date picker to remove warning
registerTranslation("de", de);

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
