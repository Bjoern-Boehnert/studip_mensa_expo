import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
	text: string;
}

export const ErrorMessage: FC<Props> = ({ text }) => {
	const { colors } = useTheme();
	return (
		<View style={styles.container}>
			<Text variant="bodyLarge" style={{ color: colors.error }}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
