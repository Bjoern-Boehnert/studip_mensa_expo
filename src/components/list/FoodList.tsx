import React, { FC, useEffect, useState } from "react";
import { List, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { FoodItem as FoodItemType, Menu } from "@/src/types/types";
import { FoodListItem } from "./FoodListItem";

interface Props {
	items: Menu;
	forbiddenAttributes: () => Promise<string[]>;
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

export const FoodList: FC<Props> = ({ items, forbiddenAttributes }) => {
	const { colors } = useTheme();
	const [filterAttributes, setFilterAttributes] = useState<string[]>([]);

	useEffect(() => {
		const load = async () => {
			setFilterAttributes(await forbiddenAttributes());
		};
		load();
	}, [filterAttributes, forbiddenAttributes]);

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
								<FoodListItem key={`${stationName}-${index}`} foodItem={food} forbiddenAttributes={filterAttributes} />
							))}
						</List.Section>
					))}
				</View>
			))}
		</>
	);
};
