export type FoodItem = {
	name: string;
	price: number;
	attributes: string[];
};

export type Menu = {
	menu:
		| {
				[locationId: string]: {
					[stationName: string]: FoodItem[];
				};
		  }
		| false;
};

export type Attribute = {
	id: string;
	label: string;
	code: string;
	group: string;
	inactive?: boolean;
};

export type Attributes = {
	attributes: {
		[key: string]: Attribute;
	};
};
