import { Attributes, Menu } from "@/src/types/types";
import { fetch } from "expo/fetch";

export const BASEURL = "https://elearning.uni-oldenburg.de/api.php";

export const getMenu = async (token: string, date: Date): Promise<Menu | null> => {
	const epochTime = Math.floor(date.getTime() / 1000.0);

	try {
		const response = await fetch(`${BASEURL}/mensa/${epochTime}`, {
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

export const getAttributes = async (token: string): Promise<Attributes | null> => {
	try {
		const response = await fetch(`${BASEURL}/mensa/attributes`, {
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
