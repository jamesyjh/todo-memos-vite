import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	"list-0": {
		id: "list-0",
		cards: ["card-0"],
		title: "myList",
		board: "board-0",
	},
};

export const slice = createSlice({
	name: "lists",
	initialState,
	reducers: {},
});

export const {} = slice.actions;

export default slice.reducer;
