import React, { FC } from "react";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export const AttributeChips: FC<{ attributes: string[]; filterAttributes: string[] }> = ({
	attributes,
	filterAttributes,
}) => {
	const { colors } = useTheme();
	const matchingAttributes = attributes.filter((attr) => filterAttributes.includes(attr));

	return (
		<View style={styles.attributeWrapper}>
			{matchingAttributes.map((attr, index) => (
				<Text
					key={`${attr}-${index}`}
					variant="bodySmall"
					style={[
						styles.attributeChip,
						{
							backgroundColor: colors.errorContainer,
							color: colors.onErrorContainer,
						},
					]}
				>
					{attr}
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
