import React, { Suspense } from "react";
import { useLectures } from "@/src/hooks/lecture/useLectures";
import { LecturePlan } from "@/src/components/lecture/LecturePlan";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { InfoMessage } from "@/src/components/InfoMessage";
import { ErrorBoundaryWrapper } from "@/src/components/ErrorBoundaryWrapper";
import { useRouter } from "expo-router";

const Content = () => {
	const { data: items } = useLectures();
	const { push } = useRouter();

	function onContinue(courseRoute: string) {
		const courseId = courseRoute.split("/").pop();
		push(`/course/${courseId}`);
	}

	if (items) {
		return <LecturePlan items={items.collection} onContinue={onContinue} />;
	}
	return <InfoMessage text="Keine Daten" />;
};

export default function Schedule() {
	return (
		<ErrorBoundaryWrapper>
			<Suspense fallback={<LoadingSpinner />}>
				<Content />
			</Suspense>
		</ErrorBoundaryWrapper>
	);
}
