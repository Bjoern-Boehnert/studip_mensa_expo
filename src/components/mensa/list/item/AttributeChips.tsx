import React, { FC, useMemo } from "react";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Attribute } from "@/src/types/types";

type Props = {
	attributes: [string, Attribute][];
};

export const AttributeChips = ({ attributes }: Props) => {
	const { colors } = useTheme();

	return (
		<View style={styles.attributeWrapper}>
			{attributes.map(([key, attr]) => (
				<Text
					key={key}
					variant="bodySmall"
					style={[
						styles.attributeChip,
						{
							backgroundColor: colors.errorContainer,
							color: colors.onErrorContainer,
						},
					]}
				>
					{attr.label}
				</Text>
			))}
		</View>
	);
};
const styles = StyleSheet.create({
	attributeWrapper: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 4,
		marginTop: 4,
	},
	attributeChip: {
		padding: 2,
		borderRadius: 4,
		fontWeight: "bold",
	},
});
