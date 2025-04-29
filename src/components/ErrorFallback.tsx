import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
	error: { message: string };
	onPressRetry: () => void;
}

export const ErrorFallback: FC<Props> = ({ onPressRetry, error }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.wrapper}>
			<MaterialCommunityIcons name="alert-circle-outline" size={48} color={colors.error} />
			<Text variant="titleLarge" style={styles.title}>
				Ein Fehler ist aufgetreten
			</Text>
			<Text variant="bodyMedium" style={[styles.message, { color: colors.error }]}>
				{error.message}
			</Text>
			<Button mode="contained" onPress={onPressRetry} style={styles.button}>
				Neu laden
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	title: {
		marginTop: 16,
		textAlign: "center",
	},
	message: {
		textAlign: "center",
		marginVertical: 12,
	},
	button: {
		marginTop: 8,
	},
});
