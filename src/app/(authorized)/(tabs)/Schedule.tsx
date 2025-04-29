import React, { Suspense } from "react";
import { useLectures } from "@/src/hooks/lecture/useLectures";
import { LecturePlan } from "@/src/components/lecture/LecturePlan";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { InfoMessage } from "@/src/components/InfoMessage";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/src/components/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";

const ScheduleContent = () => {
	const { data: items } = useLectures();
	if (items) {
		return <LecturePlan items={items.collection} />;
	}
	return <InfoMessage text="Keine Daten" />;
};

export default function Schedule() {
	return (
		<ErrorBoundaryWrapper>
			<Suspense fallback={<LoadingSpinner />}>
				<ScheduleContent />
			</Suspense>
		</ErrorBoundaryWrapper>
	);
}
