import { useQuery } from "@tanstack/react-query";
import { getAttributes } from "./api/api";
import { AttributesResponse } from "../types/types";
import attributesData from "@/src/components/mensa/filter/attributes.json";

export function useAttributes(token: string) {
	return useQuery<AttributesResponse | null>({
		queryKey: ["attributes", token],
		queryFn: async () => {
			// return await getAttributes(token);
			return attributesData;
		},
		enabled: !!token,
	});
}
