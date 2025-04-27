import React, { FC } from "react";
import { FoodItem as FoodItemType } from "../../../../types/types";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { AttributeChips } from "./AttributeChips";

interface Props {
	foodItem: FoodItemType;
	filterAttributes: string[];
}

export const FoodDescription: FC<Props> = ({ foodItem, filterAttributes }) => {
	const { colors } = useTheme();
	return (
		<View style={styles.description}>
			<Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
				€{foodItem.price.toFixed(2)}
			</Text>
			{foodItem.attributes.length > 0 && (
				<AttributeChips attributes={foodItem.attributes} filterAttributes={filterAttributes} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	description: {
		marginTop: 8,
	},
});
