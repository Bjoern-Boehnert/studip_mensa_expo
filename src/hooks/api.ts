import { Attributes, Menu } from "@/src/types/types";
import { fetch } from "expo/fetch";
import { APIUser } from "@/src/providers/AuthProvider";

export const BASEURL = "https://elearning.uni-oldenburg.de/api.php";

export const getMenu = (token: string, date: Date): Promise<Menu | null> => {
	const epochTime = Math.floor(date.getTime() / 1000.0);
	return fetchAPI<Menu>(`mensa/${epochTime}`, token);
};

export const getAttributes = (token: string): Promise<Attributes | null> => {
	return fetchAPI<Attributes>("mensa/attributes", token);
};

export const getUser = (token: string): Promise<APIUser | null> => {
	return fetchAPI<APIUser>("user", token);
};

const fetchAPI = async <T>(url: string, token: string): Promise<T | null> => {
	try {
		const response = await fetch(`${BASEURL}/${url}`, {
			headers: {
				Authorization: `Basic ${token}`,
				Accept: "application/json",
			},
		});
		if (!response.ok) return null;

		const contentType = response.headers.get("content-type") || "";
		if (contentType.includes("application/json")) {
			return await response.json();
		}
		return null;
	} catch (error) {
		return null;
	}
};
