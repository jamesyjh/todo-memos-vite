import * as R from "ramda";
import uuid from "short-uuid";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../store";
import { addCardToList, removeCardFromList } from "../lists";

const initialState = {
	cards: {
		"card-0": {
			title: "Random Card",
			list: "list-0",
		},
		"card-1": {
			title: "Random Card 2",
			list: "list-0",
		},
	},
};

export const slice = createSlice({
	name: "cards",
	initialState,
	reducers: {
		addCard: (state, action) => {
			const { newCard } = action.payload;
			state.cards = R.mergeRight(state.cards, newCard);
		},
		updateCardTitle: (state, action) => {
			const { cardId, cardTitle } = action.payload;
			state.cards[cardId].title = cardTitle;
		},
		deleteCard: (state, action) => {
			const { cardId } = action.payload;
			delete state.cards[cardId];
		},
	},
});

export default slice.reducer;

export const { updateCardTitle } = slice.actions;

export const createCard = (title: string, listId: string) => async (dispatch: AppDispatch) => {
	const id = `c-${uuid.generate()}`;

	const newCard = {
		[id]: {
			title,
			list: listId,
		},
	};

	dispatch(slice.actions.addCard({ newCard }));
	dispatch(addCardToList({ cardId: id, listId }));
};

export const removeCard =
	(listId: string, cardId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(removeCardFromList({ cardId, listId }));
		dispatch(slice.actions.deleteCard({ cardId }));
	};
