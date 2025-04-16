import { Badge, List, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import React, { FC } from "react";
import { FoodItem as FoodItemType } from "@/src/types/types";

interface Props {
	foodItem: FoodItemType;
}

export const FoodListItem: FC<Props> = ({ foodItem }) => {
	const { colors } = useTheme();

	return (
		<List.Item
			title={() => (
				<View>
					<Text style={{ fontSize: 16, fontWeight: "500" }}>{foodItem.name}</Text>
				</View>
			)}
			description={() => (
				<View style={{ marginTop: 8 }}>
					<Text style={{ color: colors.onSurfaceVariant }}>€{foodItem.price.toFixed(2)}</Text>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							gap: 4,
							marginTop: 4,
						}}
					>
						{foodItem.attributes.map((attr: string) => (
							<Badge style={{ borderRadius: 0, backgroundColor: colors.secondary }} key={attr}>
								{attr}
							</Badge>
						))}
					</View>
				</View>
			)}
		/>
	);
};
