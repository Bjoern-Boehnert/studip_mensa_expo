import { Chip, List, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
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
		<View style={styles.wrapper}>
			<View style={[styles.sideBar, { backgroundColor: colors.outline }]} />
			<View style={styles.content}>
				<List.Item
					title={() => <Text variant="bodyLarge">{foodItem.name}</Text>}
					description={() => (
						<View style={styles.description}>
							<Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
								€{foodItem.price.toFixed(2)}
							</Text>
							{matchingAttributes.length > 0 && (
								<View style={styles.attributeWrapper}>
									{matchingAttributes.map((attr, index) => (
										<Text
											key={`${attr}-${index}`}
											variant="bodyMedium"
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
							)}
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	sideBar: {
		width: 4,
		borderRadius: 2,
		marginVertical: 8,
		marginLeft: 12,
		alignSelf: "stretch",
	},
	content: {
		flex: 1,
	},
	description: {
		marginTop: 8,
	},
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
