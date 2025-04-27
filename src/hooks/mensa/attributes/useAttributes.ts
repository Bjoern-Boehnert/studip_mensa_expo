import { useQuery } from "@tanstack/react-query";
import { AttributesResponse } from "../../../types/types";
import attributesData from "@/src/components/mensa/filter/attributes.json";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";

export function useAttributes() {
	const { token } = useAuthenticatedSession();

	return useQuery<AttributesResponse | null>({
		queryKey: ["attributes", token],
		queryFn: async () => {
			// return await getAttributes(token);
			return attributesData;
		},
		enabled: !!token,
	});
}
