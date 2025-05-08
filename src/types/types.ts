export interface User {
	id: string;
	username: string;
	name: {
		family: string;
		given: string;
	};
	email: string;
	avatar: {
		original: string;
	};
}

export interface UserResponse {
	user_id: string;
	username: string;
	name: {
		family: string;
		given: string;
		prefix: string;
		suffix: string;
	};
	email: string;
	avatar_original: string;
}

export type FoodItem = {
	name: string;
	price: number;
	attributes: string[];
};

export type MenuResponse = {
	menu:
		| {
				[locationId: string]: {
					[stationName: string]: FoodItem[];
				};
		  }
		| false;
};

export type Menu = {
	[locationId: string]: {
		[stationName: string]: FoodItem[];
	};
};


export type Attribute = {
	id: string;
	label: string;
	code: string;
	group: string;
	inactive?: boolean;
};

export type AttributesResponse = {
	attributes: {
		[key: string]: Attribute;
	};
};

export type LectureEvent = {
	event_id: string;
	course: string;
	start: number;
	end: number;
	title: string;
	description: string;
	categories: string;
	room: string;
	canceled: boolean;
};

export type LectureResponse = {
	collection: LectureEvent[];
	pagination: Pagination;
};

export type CourseResponse = {
	course_id: string;
	number: string;
	title: string;
	subtitle: string;
	type: string;
	description: string;
	location: string;
	lecturers: {
		[key: string]: {
			id: string;
			href: string;
			name: {
				username: string;
				formatted: string;
				family: string;
				given: string;
				prefix: string;
				suffix: string;
			};
			avatar_normal: string;
		};
	};
	members: {
		user: string;
		user_count: number;
		autor: string;
		autor_count: number;
		tutor: string;
		tutor_count: number;
		dozent: string;
		dozent_count: number;
	};
	start_semester: string;
	end_semester: string;
	modules: {
		forum: string;
		documents: string;
		wiki: string;
	};
	group: number;
};

export interface File {
	id: string;
	file_id: string;
	folder_id: string;
	downloads: number;
	description: string;
	content_terms_of_use_id: string;
	user_id: string;
	name: string;
	mkdate: number;
	chdate: number;
	size: number;
	mime_type: string;
	storage: string;
	is_readable: boolean;
	is_downloadable: boolean;
	is_editable: boolean;
	is_writable: boolean;
}

export type FolderResponse = Folder;

export interface Folder {
	id: string;
	user_id: string;
	parent_id: string;
	range_id: string;
	range_type: string;
	folder_type: string;
	name: string;
	data_content: any[];
	description: string;
	mkdate: number;
	chdate: number;
	is_visible: boolean;
	is_readable: boolean;
	is_writable: boolean;
	subfolders: Folder[];
	file_refs: File[];
}

type Pagination = {
	total: number;
	offset: number;
	limit: number;
};
