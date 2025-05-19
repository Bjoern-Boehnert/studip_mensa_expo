import { Appbar, Avatar, useTheme } from "react-native-paper";
import { FC } from "react";
import { useAuthentication } from "@/src/providers/AuthProvider";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { StyleSheet, View } from "react-native";

interface Props {
	title: string;
}

export const AppHeader: FC<Props> = ({ title }) => {
	const { colors } = useTheme();
	const { signOut } = useAuthentication();
	const { user } = useAuthenticatedSession();

	return (
		<Appbar.Header style={[styles.header, { backgroundColor: colors.primary }]}>
			<Appbar.Content titleStyle={{ color: colors.onPrimary }} title={title} />
			<View style={styles.avatarContainer}>
				<Avatar.Image size={36} source={{ uri: user.avatar.original }} />
			</View>
			{user && <Appbar.Action color={colors.onPrimary} style={styles.action} icon="logout" onPress={signOut} />}
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
