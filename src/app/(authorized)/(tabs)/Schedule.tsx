import React from "react";
import { useLectures } from "@/src/hooks/lecture/useLectures";
import { LecturePlan } from "@/src/components/lecture/LecturePlan";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { ErrorMessage } from "@/src/components/ErrorMessage";

export default function Schedule() {
	const { data: items, isLoading, error, isError } = useLectures();

	const renderContent = () => {
		if (isError) {
			return <ErrorMessage text={error.message} />;
		}
		if (isLoading) {
			return <LoadingSpinner />;
		}
		if (items) {
			return <LecturePlan items={items.collection} />;
		}
		return <ErrorMessage text="Keine Daten" />;
	};

	return <>{renderContent()}</>;
}
