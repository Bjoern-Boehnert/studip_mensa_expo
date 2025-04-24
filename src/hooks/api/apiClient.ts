import { fetch } from "expo/fetch";

export const BASEURL = "https://elearning.uni-oldenburg.de/api.php";

export const fetchAPI = async <T>(url: string, token: string): Promise<T | null> => {
	const response = await fetch(`${BASEURL}/${url}`, {
		headers: {
			Authorization: `Basic ${token}`,
			Accept: "application/json",
		},
		credentials: "omit" // Wichtig für das Abmelden, weil sonst der Seminar_Session Cookie nicht gelöscht wird
	});
	if (!response.ok) {
		throw new Error(`Serverantwort: ${response.status}`);
	}
	const contentType = response.headers.get("content-type") || "";
	if (contentType.includes("application/json")) {
		return await response.json();
	}
	throw new Error("Serverantwort konnte nicht verarbeitet werden.");
};
