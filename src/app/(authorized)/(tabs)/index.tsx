import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { FoodList } from "@/src/components/mensa/list/FoodList";
import { BottomDateBar } from "@/src/components/mensa/list/BottomDateBar";
import { AppHeader } from "@/src/components/AppHeader";
import { useStoredAttributes } from "@/src/hooks/useStoredAttributes";
import { useMenu } from "@/src/hooks/useMenu";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { ErrorMessage } from "@/src/components/ErrorMessage";

const normalizeDate = (input: Date) => {
	const date = new Date(input);
	date.setHours(0, 0, 0, 0);
	return date;
};

export default function Index() {
	const [rawDate, setRawDate] = useState(new Date());
	const date = normalizeDate(rawDate);
	const { attributes, reloadAttributes } = useStoredAttributes();
	const { data: items, isLoading } = useMenu(date);

	// Attribute neu laden
	useFocusEffect(
		useCallback(() => {
			reloadAttributes();
		}, [reloadAttributes]),
	);

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (items) {
			if (items.menu !== false) {
				return <FoodList items={items} filterAttributes={attributes} />;
			}
		}
		return <ErrorMessage text="Kein Menü verfügbar" />;
	};

	return (
		<>
			<AppHeader title="Mensa" />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>{renderContent()}</ScrollView>
			<BottomDateBar initialDate={date} onChange={setRawDate} />
		</>
	);
}
