import { useSuspenseQuery } from "@tanstack/react-query";
import { getLectures } from "../api/api";
import { LectureResponse } from "../../types/types";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";

export function useLectures() {
	const { token, user } = useAuthenticatedSession();

	return useSuspenseQuery<LectureResponse | null>({
		queryKey: ["events", user.id, token],
		queryFn: async () => {
			return await getLectures(token, user.id);
		},
	});
}
