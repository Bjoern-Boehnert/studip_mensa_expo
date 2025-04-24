import { Appbar, Avatar, useTheme } from "react-native-paper";
import { FC } from "react";
import { useAuthentication } from "@/src/providers/AuthProvider";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { useThemeMode } from "@/src/providers/CustomThemeProvider";

interface Props {
	title: string;
}

export const AppHeader: FC<Props> = ({ title }) => {
	const { colors } = useTheme();
	const { toggleTheme, mode } = useThemeMode();

	const { signOut } = useAuthentication();
	const { user } = useAuthenticatedSession();

	return (
		<Appbar.Header style={{ backgroundColor: colors.primaryContainer }}>
			<Appbar.Content titleStyle={{ color: colors.onPrimaryContainer }} title={title} />
			<Avatar.Image size={36} source={{ uri: user.avatar.original }} style={{ marginRight: 10 }} />
			<Appbar.Action
				color={colors.onPrimaryContainer}
				style={{ margin: 5 }}
				icon={mode === "dark" ? "weather-sunny" : "weather-night"}
				onPress={toggleTheme}
			/>
			<Appbar.Action color={colors.onPrimaryContainer} style={{ margin: 5 }} icon="logout" onPress={signOut} />
		</Appbar.Header>
	);
};
