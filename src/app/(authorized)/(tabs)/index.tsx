import React, { Suspense, useState } from "react";
import { FoodList } from "@/src/components/mensa/list/item/FoodList";
import { useStoredAttributes } from "@/src/hooks/mensa/attributes/useStoredAttributes";
import { useMenu } from "@/src/hooks/mensa/useMenu";
import { useFocusEffect } from "expo-router";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { InfoMessage } from "@/src/components/InfoMessage";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";
import { IconButton, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { DateBar } from "@/src/components/DateBar";

const normalizeDate = (input: Date) => {
	const date = new Date(input);
	date.setHours(0, 0, 0, 0);
	return date;
};

const Content = ({ date, locationId }: { date: Date; locationId: string }) => {
	const { attributes, reload: reloadAttributes } = useStoredAttributes();

	useFocusEffect(() => {
		void reloadAttributes();
	});

	const { data: items } = useMenu(date);
	if (items && items.menu !== false && items.menu[locationId] !== null) {
		return <FoodList items={{ [locationId]: items.menu[locationId] }} filterAttributes={attributes} />;
	}

	return <InfoMessage text="Kein Menü verfügbar" />;
};

export default function Index() {
	const { colors } = useTheme();
	const [rawDate, setRawDate] = useState(new Date());
	const initialDate = normalizeDate(new Date());
	const date = normalizeDate(rawDate);
	const [locationId, setLocationId] = useState("2");

	const toggleMenu = () => {
		setLocationId(locationId === "2" ? "3" : "2");
	};

	return (
		<>
			<ErrorBoundaryWrapper>
				<Suspense fallback={<LoadingSpinner />}>
					<Content date={date} locationId={locationId} />
				</Suspense>
			</ErrorBoundaryWrapper>
			<View style={[styles.outerContainer, { borderColor: colors.outline }]}>
				<IconButton icon="swap-horizontal" onPress={toggleMenu} />
				<DateBar initialDate={initialDate} onChange={setRawDate} enableDatePicker={true} />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
		borderTopWidth: 2,
	},
});
