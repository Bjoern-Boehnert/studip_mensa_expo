import { useSuspenseQuery } from "@tanstack/react-query";
import { FolderResponse } from "../../types/types";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { getLectureForumCategories, getLectureTopFolder, getLectureWiki } from "@/src/hooks/api/api";

export function useLectureModules(courseId: string, option: "forum_categories" | "top_folder" | "wiki") {
	const { token } = useAuthenticatedSession();

	return useSuspenseQuery<FolderResponse | null>({
		queryKey: [`course/${courseId}/${option}`],
		queryFn: async () => {
			switch (option) {
				case "forum_categories":
					return await getLectureForumCategories(token, courseId);
				case "top_folder":
					return await getLectureTopFolder(token, courseId);
				case "wiki":
					return await getLectureWiki(token, courseId);
			}
		},
		staleTime: 10 * 60 * 1000,
	});
}
