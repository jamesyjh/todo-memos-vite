import * as R from "ramda";
import uuid from "short-uuid";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../store";
import { addCardToList } from "../lists";

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
	},
});

export default slice.reducer;

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
