export interface Board {
	lists: string[];
	name: string;
	image: string;
}

export interface Boards {
	[key: string]: Board;
}

export interface BoardsState {
	boards: Boards;
	favorites: string[];
	editing: string;
	active: string;
}

export interface RearrangePayload {
	boardId: string;
	droppableIdStart: string;
	droppableIdEnd: string;
	droppableIndexStart: number;
	droppableIndexEnd: number;
	draggableId: string;
	type: string;
}
