import { useQuery } from "@tanstack/react-query";
import { getLectures } from "./api/api";
import { LectureResponse } from "../types/types";

export function useLectures(token: string, userId: string) {
	return useQuery<LectureResponse | null>({
		queryKey: ["events", userId, token],
		queryFn: async () => {
			return await getLectures(token, userId);
		},
		enabled: !!token,
	});
}
