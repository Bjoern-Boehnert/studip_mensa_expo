import React from "react";
import { useLectures } from "@/src/hooks/lecture/useLectures";
import { LecturePlan } from "@/src/components/lecture/LecturePlan";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { InfoMessage } from "@/src/components/InfoMessage";

export default function Schedule() {
	const { data: items, isLoading, error, isError } = useLectures();

	const renderContent = () => {
		if (isError) {
			return <InfoMessage text={error.message} />;
		}
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (items) {
			return <LecturePlan items={items.collection} />;
		}
		return <InfoMessage text="Keine Daten" />;
	};

	return <>{renderContent()}</>;
}
