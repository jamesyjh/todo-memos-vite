import * as R from "ramda";
import { AnyAction, createSlice } from "@reduxjs/toolkit";
import uuid from "short-uuid";
import { AppDispatch, RootState } from "../../../store";
import { sortCards } from "../lists";

const initialState = {
	boards: {
		"board-0": {
			lists: ["list-0"],
			name: "Default Board",
			image: "https://loremflickr.com/640/360",
		},
		"board-1": {
			lists: ["list-1"],
			name: "Board 2",
			image: "https://loremflickr.com/720/400",
		},
		"board-2": {
			lists: ["list-2"],
			name: "Board 2",
			image: "https://loremflickr.com/820/400",
		},
	},
	editing: "",
	active: "",
};

export const slice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		setActiveBoard: (state, action) => {
			const { boardId } = action.payload;
			state.active = boardId;
		},
		createBoard: (state) => {
			const id = `b-${uuid.generate()}`;
			//TODO: handle switch to edit mode here
			state.editing = id;
			const newBoard = {
				[id]: {
					name: "Untitled Board",
					lists: [],
					image: `https://loremflickr.com/${Math.floor(Math.random() * 901) + 100}/${
						Math.floor(Math.random() * 901) + 100
					}`,
				},
			};

			state.boards = R.mergeRight(state.boards, newBoard);
		},
		removeBoard: (state = initialState, action: AnyAction) => {
			const { boardId } = action.payload;
			if (boardId in state.boards) {
				delete state.boards[boardId];
			}
		},
		addListToBoard: (state, action) => {
			const { boardId, listId } = action.payload;
			const board = state.boards[boardId];
			const updatedLists = R.concat(board.lists, [listId]);
			board.lists = updatedLists;
		},
		removeListFromBoard: (state, action) => {
			const { boardId, listId } = action.payload;
			const board = state.boards[boardId];
			const updatedLists = board.lists.filter((id) => id !== listId);
			board.lists = updatedLists;
		},
		updateBoard: (state, action) => {
			const { boardId, updatedName } = action.payload;
			state.boards[boardId].name = updatedName;
			state.editing = "";
		},
		setEditing: (state, action) => {
			const { boardId } = action.payload;
			state.editing = boardId;
		},
		updateBoardImage: (state, action) => {
			const { boardId, imageURL } = action.payload;
			const board = state.boards[boardId];
			board.image = imageURL;
		},
		sortList: (state, action) => {
			const { boardId, type, droppableIndexStart, droppableIndexEnd } = action.payload;
			const board = state.boards[boardId];
			const lists = board.lists;

			const pulledOutList = lists.splice(droppableIndexStart, 1);
			lists.splice(droppableIndexEnd, 0, ...pulledOutList);
			board.lists = lists;

			state.boards = R.mergeDeepRight(state.boards, { [boardId]: board });
		},
	},
});

export const {
	setActiveBoard,
	createBoard,
	removeBoard,
	addListToBoard,
	removeListFromBoard,
	updateBoard,
	setEditing,
	sortList,
	updateBoardImage,
} = slice.actions;

export default slice.reducer;

export const rearrange =
	({ boardId, droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type }) =>
	async (dispatch: AppDispatch, getState: () => RootState) => {
		if (type === "list") {
			dispatch(slice.actions.sortList({ boardId, type, droppableIndexStart, droppableIndexEnd }));
		}

		if (type === "card") {
			dispatch(
				sortCards({ droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId, type })
			);
		}
	};
