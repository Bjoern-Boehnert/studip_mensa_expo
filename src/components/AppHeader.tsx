import { Appbar, Avatar, useTheme } from "react-native-paper";
import { FC } from "react";
import { useAuthentication } from "@/src/providers/AuthProvider";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { useThemeMode } from "@/src/providers/CustomThemeProvider";
import { StyleSheet, View } from "react-native";

interface Props {
	title: string;
}

export const AppHeader: FC<Props> = ({ title }) => {
	const { colors } = useTheme();
	const { toggleTheme, mode } = useThemeMode();
	const { signOut } = useAuthentication();
	const { user } = useAuthenticatedSession();

	return (
		<Appbar.Header style={[styles.header, { backgroundColor: colors.primaryContainer }]}>
			<Appbar.Content titleStyle={{ color: colors.onPrimaryContainer }} title={title} />
			<View style={styles.avatarContainer}>
				<Avatar.Image size={36} source={{ uri: user.avatar.original }} />
			</View>
			<Appbar.Action
				color={colors.onPrimaryContainer}
				style={styles.action}
				icon={mode === "dark" ? "weather-sunny" : "weather-night"}
				onPress={toggleTheme}
			/>
			{user && (
				<Appbar.Action
					color={colors.onPrimaryContainer}
					style={styles.action}
					icon="logout"
					onPress={signOut}
				/>
			)}
		</Appbar.Header>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 16,
	},
	avatarContainer: {
		marginRight: 10,
	},
	action: {
		margin: 5,
	},
});
