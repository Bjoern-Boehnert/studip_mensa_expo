import { useQuery } from "@tanstack/react-query";
import { getMenu } from "./api";
import { Menu } from "../types/types";

export function useMenu(token: string, date: Date) {
	const dateString = date.toISOString().split("T")[0];

	return useQuery<Menu | null>({
		queryKey: ["menu", token, dateString],
		queryFn: async () => {
			const data = await getMenu(token, date);
			return data ?? { menu: false };
		},
		enabled: !!token,
	});
}
