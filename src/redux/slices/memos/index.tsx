import { createSlice } from "@reduxjs/toolkit";
import uuid from "short-uuid";
import { getMemoSlug } from "../../../utils";

const initialState = {
	items: [],
	lastSeen: 0,
};

export const slice = createSlice({
	name: "memos",
	initialState,
	reducers: {
		addMemo: (state) => {
			const title = "Untitled Note";
			const id = uuid.generate();
			const slug = getMemoSlug(title);
			state.items.push({ id, slug, color: "default", title: title, contentState: { blocks: [], entityMap: {} } });
		},
		saveMemo: (state, action) => {
			const { title, id, contentState } = action.payload;
			const memo = state.items.find((item) => item.id === id);
			if (memo) {
				memo.title = title;
				memo.slug = getMemoSlug(title);
				memo.contentState = contentState;
			}
		},
		removeMemo: (state, action) => {
			const { id } = action.payload;
			state.items = state.items.filter((item) => item.id !== id);
		},
		setLastSeen: (state, action) => {
			const { index } = action.payload;
			state.lastSeen = index;
		},
		setColor: (state, action) => {
			const { id, color } = action.payload;
			const memo = state.items.find((item) => item.id === id);
			if (memo) {
				memo.color = color;
			}
		},
	},
});

export const { addMemo, saveMemo, removeMemo, setLastSeen, setColor } = slice.actions;

export default slice.reducer;
