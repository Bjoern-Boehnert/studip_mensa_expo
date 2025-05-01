import React, { FC, useMemo } from "react";
import { Attribute, FoodItem as FoodItemType } from "../../../../types/types";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { AttributeChips } from "./AttributeChips";

interface Props {
	foodItem: FoodItemType;
	filterAttributes: [string, Attribute][];
}

export const FoodDescription: FC<Props> = ({ foodItem, filterAttributes }) => {
	const { colors } = useTheme();

	const matchingAttributes = useMemo(
		() => filterAttributes.filter(([filterKey]) => foodItem.attributes.includes(filterKey)),
		[foodItem.attributes, filterAttributes],
	);

	return (
		<View style={styles.description}>
			<Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
				€{foodItem.price.toFixed(2)}
			</Text>
			{foodItem.attributes.length > 0 && <AttributeChips attributes={matchingAttributes} />}
		</View>
	);
};

const styles = StyleSheet.create({
	description: {
		marginTop: 8,
	},
});
