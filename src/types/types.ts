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

type Pagination = {
	total: number;
	offset: number;
	limit: number;
};
