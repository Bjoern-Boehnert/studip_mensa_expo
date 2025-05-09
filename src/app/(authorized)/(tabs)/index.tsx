import React, { Suspense, useState } from "react";
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
			<BottomDateBar initialDate={initialDate} onChange={setRawDate} handleSwitch={toggleMenu} />
		</>
	);
}
