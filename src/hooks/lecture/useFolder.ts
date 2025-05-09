import { useQuery } from "@tanstack/react-query";
import { FolderResponse } from "../../types/types";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";
import { getFolder } from "@/src/hooks/api/api";

export function useFolder(folderId: string) {
	const { token } = useAuthenticatedSession();

	return useQuery<FolderResponse | null>({
		queryKey: [`folder/${folderId}`],
		queryFn: async () => {
			return await getFolder(token, folderId);
		},
		staleTime: 10 * 60 * 1000,
	});
}
