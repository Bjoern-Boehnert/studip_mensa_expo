import { useSuspenseQuery } from "@tanstack/react-query";
import { AttributesResponse } from "@/src/types/types";
import attributesData from "@/src/hooks/mensa/attributes/attributes.json";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";

export function useAttributes() {
	const { token } = useAuthenticatedSession();

	return useSuspenseQuery<AttributesResponse | null>({
		queryKey: ["mensa/attributes"],
		queryFn: async () => {
			// return await getAttributes(token);
			return attributesData;
		},
		staleTime: 10 * 60 * 1000,
	});
}
