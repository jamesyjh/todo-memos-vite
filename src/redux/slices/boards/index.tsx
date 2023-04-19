import { createSlice } from "@reduxjs/toolkit";
import * as R from "ramda";
import uuid from "short-uuid";

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
};

export const slice = createSlice({
	name: "boards",
	initialState,
	reducers: {
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
		removeBoard: (state, action) => {
			const { boardId } = action.payload;
			if (boardId in state.boards) {
				delete state.boards[boardId];
			}
		},
		addListToBoard: (state, action) => {
			const { boardId, listId } = action.payload;
			const board = state[boardId];
			const updatedLists = R.concat(board.lists, `list-${listId}`);
			board.lists = updatedLists;
		},
		removeListFromBoard: (state, action) => {
			const { boardId, listId } = action.payload;
			const board = state[boardId];
			const updatedLists = board.lists.filter((id) => id !== listId);
			board.lists = updatedLists;
		},
		updateBoard: (state, action) => {
			const { boardId, updatedName } = action.payload;
			state.boards[boardId].name = updatedName;
			state.editing = "";
		},
	},
});

export const { createBoard, removeBoard, addListToBoard, removeListFromBoard, updateBoard } = slice.actions;

export default slice.reducer;
