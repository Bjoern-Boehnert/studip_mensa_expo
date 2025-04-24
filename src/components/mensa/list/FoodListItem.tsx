import { Chip, List, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import React, { FC } from "react";
import { FoodItem as FoodItemType } from "@/src/types/types";

interface Props {
	foodItem: FoodItemType;
	filterAttributes: string[];
}

export const FoodListItem: FC<Props> = ({ foodItem, filterAttributes }) => {
	const { colors } = useTheme();

	const matchingAttributes = foodItem.attributes.filter((attr) => filterAttributes.includes(attr));

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "flex-start",
			}}
		>
			<View
				style={{
					width: 4,
					backgroundColor: colors.outline,
					borderRadius: 2,
					marginVertical: 8,
					marginLeft: 12,
					alignSelf: "stretch",
				}}
			/>
			<View style={{ flex: 1 }}>
				<List.Item
					title={() => <Text variant="bodyLarge">{foodItem.name}</Text>}
					description={() => (
						<View style={{ marginTop: 8 }}>
							<Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
								€{foodItem.price.toFixed(2)}
							</Text>
							{matchingAttributes.length > 0 && (
								<View
									style={{
										flexDirection: "row",
										flexWrap: "wrap",
										gap: 4,
										marginTop: 4,
									}}
								>
									{matchingAttributes.map((attr) => (
										<Text
											variant="bodyMedium"
											style={{
												backgroundColor: colors.errorContainer,
												color: colors.onErrorContainer,
												padding: 2,
												borderRadius: 4,
												fontWeight: "bold",
											}}
										>
											{attr}
										</Text>
									))}
								</View>
							)}
						</View>
					)}
				/>
			</View>
		</View>
	);
};
