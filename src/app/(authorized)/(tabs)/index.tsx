import React, { Suspense, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FoodList } from "@/src/components/mensa/list/item/FoodList";
import { BottomDateBar } from "@/src/components/mensa/list/BottomDateBar";
import { useStoredAttributes } from "@/src/hooks/mensa/attributes/useStoredAttributes";
import { useMenu } from "@/src/hooks/mensa/useMenu";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { InfoMessage } from "@/src/components/InfoMessage";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";

const normalizeDate = (input: Date) => {
	const date = new Date(input);
	date.setHours(0, 0, 0, 0);
	return date;
};

const MenuContent = ({ date }: { date: Date }) => {
	const { attributes, reload: reloadAttributes } = useStoredAttributes();

	useFocusEffect(() => {
		void reloadAttributes();
	});
	const { data: items } = useMenu(date);
	if (items && items.menu !== false) {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<FoodList items={items} filterAttributes={attributes} />
			</ScrollView>
		);
	}

	return <InfoMessage text="Kein Menü verfügbar" />;
};

export default function Index() {
	const [rawDate, setRawDate] = useState(new Date());
	const date = normalizeDate(rawDate);

	return (
		<>
			<ErrorBoundaryWrapper key={date.toISOString()}>
				<Suspense fallback={<LoadingSpinner />}>
					<MenuContent date={date} />
				</Suspense>
			</ErrorBoundaryWrapper>
			<BottomDateBar initialDate={date} onChange={setRawDate} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
});
