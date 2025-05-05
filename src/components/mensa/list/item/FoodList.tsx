import React, { useMemo } from "react";
import { SectionList, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Attribute, Menu } from "@/src/types/types";
import { FoodListItem } from "./FoodListItem";
import { FoodListHeader } from "@/src/components/mensa/list/FoodListHeader";

interface Props {
	items: Menu;
	filterAttributes: [string, Attribute][];
}

export const FoodList: React.FC<Props> = ({ items, filterAttributes }) => {
	const locationId = Object.keys(items)[0];
	const stations = items[locationId];
	const { colors } = useTheme();

	const sections = useMemo(() => {
		return Object.entries(stations).map(([stationName, foodItems]) => ({
			title: stationName,
			data: foodItems,
		}));
	}, [stations]);

	return (
		<SectionList
			scrollEventThrottle={16}
			windowSize={10}
			sections={sections}
			ListHeaderComponent={<FoodListHeader locationId={locationId} />}
			renderSectionHeader={({ section }) => (
				<Text variant="bodyMedium" style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>
					{section.title}
				</Text>
			)}
			renderItem={({ item }) => <FoodListItem foodItem={item} filterAttributes={filterAttributes} />}
		/>
	);
};

const styles = StyleSheet.create({
	sectionTitle: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	emptyContainer: {
		padding: 16,
		alignItems: "center",
	},
});
