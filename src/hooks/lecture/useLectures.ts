import { useSuspenseQuery } from "@tanstack/react-query";
import { LectureResponse } from "../../types/types";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import lectures from "@/src/hooks/lecture/lectures.json";
import { getLectures } from "@/src/hooks/api/api";

export function useLectures() {
	const { token, user } = useAuthenticatedSession();

	return useSuspenseQuery<LectureResponse | null>({
		queryKey: [`user/${user.id}/events`],
		queryFn: async () => {
			// return await getLectures(token, user.id);
			return lectures;
		},
		staleTime: 10 * 60 * 1000,
	});
}
