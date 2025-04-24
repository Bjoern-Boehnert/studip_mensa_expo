import { AttributesResponse, LectureResponse, MenuResponse, UserResponse } from "../../types/types";
import { fetchAPI } from "./apiClient";

export const getMenu = (token: string, date: Date): Promise<MenuResponse | null> => {
	const epochTime = Math.floor(date.getTime() / 1000.0);
	return fetchAPI<MenuResponse>(`mensa/${epochTime}`, token);
};

export const getAttributes = (token: string): Promise<AttributesResponse | null> => {
	return fetchAPI<AttributesResponse>("mensa/attributes", token);
};

export const getUser = (token: string): Promise<UserResponse | null> => {
	return fetchAPI<UserResponse>("user", token);
};

export const getLectures = (token: string, userId: string): Promise<LectureResponse | null> => {
	return fetchAPI<LectureResponse>(`users/${userId}/events`, token);
};
