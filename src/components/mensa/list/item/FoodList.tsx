import React, { FC } from "react";
import { List } from "react-native-paper";
import { View } from "react-native";
import { FoodItem as FoodItemType, MenuResponse, Attribute } from "@/src/types/types";
import { FoodListItem } from "./FoodListItem";
import { FoodListHeader } from "@/src/components/mensa/list/FoodListHeader";

interface Props {
	items: MenuResponse;
	filterAttributes: [string, Attribute][];
}

export const FoodList: FC<Props> = ({ items, filterAttributes }) => {
	return (
		<>
			{Object.entries(items.menu).map(([locationId, stations]: [string, Record<string, FoodItemType[]>]) => (
				<View key={locationId}>
					<FoodListHeader locationId={locationId} />
					{Object.entries(stations).map(([stationName, foodItems]: [string, FoodItemType[]]) => (
						<List.Section key={stationName} title={stationName}>
							{foodItems.map((food: FoodItemType, index: number) => (
								<FoodListItem key={`${stationName}-${index}`} foodItem={food} filterAttributes={filterAttributes} />
							))}
						</List.Section>
					))}
				</View>
			))}
		</>
	);
};
