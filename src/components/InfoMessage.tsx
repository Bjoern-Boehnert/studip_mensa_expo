import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
	text: string;
}

export const InfoMessage: FC<Props> = ({ text }) => {
	const { colors } = useTheme();
	return (
		<View style={styles.wrapper}>
			<MaterialCommunityIcons name="information-outline" size={48} color={colors.onBackground} />
			<Text variant="bodyMedium" style={[styles.message]}>
				{text}
			</Text>
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
	message: {
		textAlign: "center",
		marginVertical: 12,
	},
});
