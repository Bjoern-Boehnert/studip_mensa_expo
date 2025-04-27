import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FoodList } from "@/src/components/mensa/list/item/FoodList";
import { BottomDateBar } from "@/src/components/mensa/list/BottomDateBar";
import { AppHeader } from "@/src/components/AppHeader";
import { useStoredAttributes } from "@/src/hooks/mensa/attributes/useStoredAttributes";
import { useMenu } from "@/src/hooks/mensa/useMenu";
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
	const { data: items, isLoading, isError, error } = useMenu(date);

	// Attribute neu laden
	useFocusEffect(() => {
		void reloadAttributes();
	});

	const renderContent = () => {
		if(isError){
			return <ErrorMessage text={error.message} />
		}
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (items && items.menu !== false) {
			return <FoodList items={items} filterAttributes={attributes} />;
		}
		return <ErrorMessage text="Kein Menü verfügbar" />;
	};

	return (
		<>
			<AppHeader title="Mensa" />
			<ScrollView contentContainerStyle={styles.container}>{renderContent()}</ScrollView>
			<BottomDateBar initialDate={date} onChange={setRawDate} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
});
