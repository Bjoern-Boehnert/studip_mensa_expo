import React, { FC } from "react";
import { Text, useTheme, List } from "react-native-paper";
import { View } from "react-native";
import { FoodItem as FoodItemType, Menu } from "@/src/types/types";
import { FoodListItem } from "./FoodListItem";

interface Props {
	items: Menu;
}

function getMensaName(locationId: string): string {
	switch (locationId) {
		case "2":
			return "Uhlhornsweg";
		case "3":
			return "Wechloy";
		default:
			return "Unbekannte Mensa";
	}
}

export const FoodList: FC<Props> = ({ items }) => {
	const { colors } = useTheme();

	return (
		<>
			{Object.entries(items.menu).map(([locationId, stations]: [string, Record<string, FoodItemType[]>]) => (
				<View key={locationId} style={{ marginBottom: 24 }}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							backgroundColor: colors.primary,
							color: colors.onPrimary,
							marginBottom: 8,
							paddingHorizontal: 16,
						}}
					>
						{getMensaName(locationId)}
					</Text>

					{Object.entries(stations).map(([stationName, foodItems]: [string, FoodItemType[]]) => (
						<List.Section key={stationName} title={stationName}>
							{foodItems.map((food: FoodItemType, index: number) => (
								<FoodListItem key={`${stationName}-${index}`} foodItem={food} />
							))}
						</List.Section>
					))}
				</View>
			))}
		</>
	);
};
