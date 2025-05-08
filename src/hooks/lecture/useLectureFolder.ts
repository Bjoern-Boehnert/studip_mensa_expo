import { useSuspenseQuery } from "@tanstack/react-query";
import { FolderResponse } from "../../types/types";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { getLectureFolder } from "@/src/hooks/api/api";

export function useLectureFolder(courseId: string) {
	const { token } = useAuthenticatedSession();

	return useSuspenseQuery<FolderResponse | null>({
		queryKey: [`course/${courseId}/top_folder`],
		queryFn: async () => {
			return await getLectureFolder(token, courseId);
		},
		staleTime: 10 * 60 * 1000,
	});
}
