import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getMenu } from "../api/api";
import { MenuResponse } from "../../types/types";
import { useAuthenticatedSession } from "@/src/hooks/auth/useAuthenticatedSession";

export function useMenu(date: Date) {
	const { token } = useAuthenticatedSession();

	const dateString = date.toISOString().split("T")[0];
	return useSuspenseQuery<MenuResponse | null>({
		queryKey: ["menu", token, dateString],
		queryFn: queryFn,
	});

	async function queryFn() {
		return await getMenu(token, date);
	}
}
