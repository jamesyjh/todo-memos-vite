import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	"card-0": {
		text: "Last Episode",
		id: `card-0`,
		list: "list-0",
	},
};

export const slice = createSlice({
	name: "cards",
	initialState,
	reducers: {},
});

export const {} = slice.actions;

export default slice.reducer;
