import { List, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { FoodItem as FoodItemType } from "../../../../types/types";
import { FoodDescription } from "./FoodDescription";

interface Props {
	foodItem: FoodItemType;
	filterAttributes: string[];
}

export const FoodListItem: FC<Props> = ({ foodItem, filterAttributes }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.wrapper}>
			<View style={[styles.sideBar, { backgroundColor: colors.outline }]} />
			<View style={styles.content }>
				<List.Item
					title={() => <Text variant="bodySmall">{foodItem.name}</Text>}
					description={() => <FoodDescription foodItem={foodItem} filterAttributes={filterAttributes} />}
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
});
