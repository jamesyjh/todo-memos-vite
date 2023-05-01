import * as R from "ramda";
import uuid from "short-uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../store";
import { addCardToList, removeCardFromList } from "../lists";
import { Card, Cards, CardsState } from "./types";

const initialState: CardsState = {
	cards: {} as Cards,
};

const defaultColor = "#DFE3E6";

export const slice = createSlice({
	name: "cards",
	initialState,
	reducers: {
		addCard: (state, action: PayloadAction<{ newCard: { [key: string]: Card } }>) => {
			const { newCard } = action.payload;
			state.cards = R.mergeRight(state.cards, newCard);
		},
		updateCardTitle: (state, action: PayloadAction<{ cardId: string; cardTitle: string }>) => {
			const { cardId, cardTitle } = action.payload;
			state.cards[cardId].title = cardTitle;
		},
		deleteCard: (state, action: PayloadAction<{ cardId: string }>) => {
			const { cardId } = action.payload;
			delete state.cards[cardId];
		},
		updateCardColor: (state, action: PayloadAction<{ cardId: string; updatedColor: string }>) => {
			const { updatedColor, cardId } = action.payload;
			const card = state.cards[cardId];
			card.color = updatedColor;
		},
	},
});

export default slice.reducer;

export const { updateCardTitle, updateCardColor } = slice.actions;

export const createCard = (title: string, listId: string) => (dispatch: AppDispatch) => {
	const id = `c-${uuid.generate()}`;

	const newCard = {
		[id]: {
			title,
			list: listId,
			color: defaultColor,
		},
	};

	dispatch(slice.actions.addCard({ newCard }));
	dispatch(addCardToList({ cardId: id, listId }));
};

export const removeCard = (listId: string, cardId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
	dispatch(removeCardFromList({ cardId, listId }));
	dispatch(slice.actions.deleteCard({ cardId }));
};
