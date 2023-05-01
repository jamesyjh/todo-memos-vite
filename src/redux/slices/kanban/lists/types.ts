export interface List {
	cards: string[];
	title: string;
	board: string;
	color: string;
}

export interface Lists {
	[key: string]: List;
}

export interface ListsState {
	lists: Lists;
}

export interface CardRearrangePayload {
	droppableIdStart: string;
	droppableIdEnd: string;
	droppableIndexStart: number;
	droppableIndexEnd: number;
	draggableId: string;
}
