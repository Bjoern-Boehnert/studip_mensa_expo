import {
	AttributesResponse,
	CourseResponse,
	FolderResponse,
	LectureResponse,
	MenuResponse,
	UserResponse,
} from "../../types/types";
import { downloadAPI, fetchAPI } from "./apiClient";

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
	return fetchAPI<LectureResponse>(`user/${userId}/events`, token);
};

export const getLectureInfo = (token: string, courseId: string): Promise<CourseResponse | null> => {
	return fetchAPI<CourseResponse>(`course/${courseId}`, token);
};
export const getLectureTopFolder = (token: string, courseId: string): Promise<FolderResponse | null> => {
	return fetchAPI<FolderResponse>(`course/${courseId}/top_folder`, token);
};
export const getLectureForumCategories = (token: string, courseId: string): Promise<any | null> => {
	return fetchAPI<any>(`course/${courseId}/forum_categories`, token);
};

export const getLectureWiki = (token: string, courseId: string): Promise<any | null> => {
	return fetchAPI<any>(`course/${courseId}/wiki`, token);
};

export const getFolder = (token: string, folderId: string): Promise<FolderResponse | null> => {
	return fetchAPI<FolderResponse>(`folder/${folderId}`, token);
};

export const downloadFile = (token: string, fileId: string): Promise<ArrayBuffer> => {
	return downloadAPI(`file/${fileId}/download`, token);
};
