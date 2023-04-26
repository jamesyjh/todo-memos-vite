import * as R from "ramda";
import uuid from "short-uuid";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../store";
import { addListToBoard } from "../boards";

const initialState = {
	lists: {
		"list-0": {
			cards: ["card-0", "card-1"],
			title: "Default List",
			board: "board-0",
			color: "#DFE3E6",
		},
	},
};

export const slice = createSlice({
	name: "lists",
	initialState,
	reducers: {
		addList: (state, action) => {
			const { newList } = action.payload;
			state.lists = R.mergeRight(state.lists, newList);
		},
		addCardToList: (state, action) => {
			const { cardId, listId } = action.payload;
			const list = state.lists[listId];
			const updatedLists = R.concat(list.cards, [cardId]);
			list.cards = updatedLists;
		},
		sortCards: (state, action) => {
			const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd } = action.payload;
			// same list
			if (droppableIdStart === droppableIdEnd) {
				const list = state.lists[droppableIdStart];
				const card = list.cards.splice(droppableIndexStart, 1);
				list.cards.splice(droppableIndexEnd, 0, ...card);
				state.lists = R.mergeDeepRight(state.lists, { [droppableIdStart]: list });
			} else {
				const startList = state.lists[droppableIdStart];
				const card = startList.cards.splice(droppableIndexStart, 1);
				const endList = state.lists[droppableIdEnd];
				endList.cards.splice(droppableIndexEnd, 0, ...card);
				state.lists = R.mergeDeepRight(state.lists, { [droppableIdStart]: startList }, { [droppableIdEnd]: endList });
			}
		},
		setListColor: (state, action) => {
			const { updatedColor, listId } = action.payload;
			console.log(updatedColor, listId);
			const list = state.lists[listId];
			list.color = updatedColor;
		},
	},
});

export const { addCardToList, sortCards, setListColor } = slice.actions;

export default slice.reducer;

export const createList = (title: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
	const activeBoard = getState().boards.active;
	const id = `l-${uuid.generate()}`;
	const defaultColor = "#DFE3E6";
	const newList = {
		[id]: {
			title,
			board: activeBoard,
			cards: [],
			color: defaultColor,
		},
	};

	dispatch(slice.actions.addList({ newList }));

	dispatch(addListToBoard({ boardId: activeBoard, listId: id }));
};
