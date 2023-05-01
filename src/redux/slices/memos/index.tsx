import * as R from "ramda";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "short-uuid";
import { getMemoSlug } from "../../../utils";
import { ContentState, Memo, MemosState } from "./types";

const initialState: MemosState = {
	memos: {},
	pinned: [],
	lastSeen: 0,
};

export const slice = createSlice({
	name: "memos",
	initialState,
	reducers: {
		addMemo: (state) => {
			const title = "Untitled Note";
			const id = `m-${uuid.generate()}`;

			const newMemo = {
				[id]: {
					color: "default",
					title,
					contentState: {
						blocks: [],
						entityMap: {},
					},
				},
			};
			state.memos = R.mergeRight(state.memos, newMemo);
		},
		saveMemo: (
			state,
			action: PayloadAction<{
				title: string;
				id: string;
				contentState: ContentState;
			}>
		) => {
			const { title, id, contentState } = action.payload;
			const memo = state.memos[id];
			if (memo) {
				memo.title = title;
				memo.slug = getMemoSlug(title);
				memo.contentState = contentState;
			}
		},
		removeMemo: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;

			const currentPinned = state.pinned;
			const updatedPinned = currentPinned.filter((memoId) => memoId !== id);
			state.pinned = updatedPinned;

			delete state.memos[id];
		},
		setLastSeen: (state, action) => {
			const { index } = action.payload;
			state.lastSeen = index;
		},
		setColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
			const { id, color } = action.payload;
			const memo = state.memos[id];
			if (memo) {
				memo.color = color;
			}
		},
		updatePinnedMemos: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			const currentPinned = state.pinned;
			if (currentPinned.includes(id)) {
				const updatedPinned = currentPinned.filter((memoId) => memoId !== id);
				state.pinned = updatedPinned;
			} else {
				state.pinned = [...state.pinned, id];
			}
		},
	},
});

export const { addMemo, saveMemo, removeMemo, setLastSeen, setColor, updatePinnedMemos } = slice.actions;

export default slice.reducer;
