import { useSuspenseQuery } from "@tanstack/react-query";
import { CourseResponse } from "../../types/types";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { getLectureInfo } from "@/src/hooks/api/api";

// Evtl Flags für Topfolder, wiki, etc um anderen hook zu sparen?
export function useLectureInfo(courseId: string) {
	const { token } = useAuthenticatedSession();

	return useSuspenseQuery<CourseResponse | null>({
		queryKey: [`course/${courseId}`],
		queryFn: async () => {
			return await getLectureInfo(token, courseId);
		},
		staleTime: 10 * 60 * 1000,
	});
}
