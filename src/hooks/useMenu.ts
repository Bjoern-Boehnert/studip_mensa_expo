import { useQuery } from "@tanstack/react-query";
import { getMenu } from "./api/api";
import { MenuResponse } from "../types/types";

export function useMenu(token: string, date: Date) {
	const dateString = date.toISOString().split("T")[0];

	return useQuery<MenuResponse | null>({
		queryKey: ["menu", token, dateString],
		queryFn: async () => {
			return await getMenu(token, date);
		},
		enabled: !!token,
	});
}
