import { fetch } from "expo/fetch";

export const BASEURL = "https://elearning.uni-oldenburg.de/api.php";

export const fetchAPI = async <T>(url: string, token: string): Promise<T | null> => {
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
