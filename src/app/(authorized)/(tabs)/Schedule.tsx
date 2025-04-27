import React from "react";
import { AppHeader } from "@/src/components/AppHeader";
import { useLectures } from "@/src/hooks/lecture/useLectures";
import { LecturePlan } from "@/src/components/lecture/LecturePlan";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { ErrorMessage } from "@/src/components/ErrorMessage";

export default function Schedule() {
	const { data: items, isLoading } = useLectures();

	const renderContent = () => {
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (items) {
			return <LecturePlan items={items.collection} />;
		}
		return <ErrorMessage text="Keine Daten" />;
	};

	return (
		<>
			<AppHeader title="Stundenplan" />
			{renderContent()}
		</>
	);
}
