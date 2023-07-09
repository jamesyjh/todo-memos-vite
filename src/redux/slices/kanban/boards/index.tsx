import * as R from "ramda";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "short-uuid";
import { AppDispatch, RootState } from "../../../store";
import { sortCards } from "../lists";
import { Boards, BoardsState, RearrangePayload } from "./types";

const initialState: BoardsState = {
  boards: {} as Boards,
  favorites: [],
  editing: "",
  active: "",
};

export const slice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      const { boardId } = action.payload;
      state.active = boardId;
    },
    createBoard: (state, action: PayloadAction<void>) => {
      const id = `b-${uuid.generate()}`;
      state.editing = id;
      const newBoard = {
        [id]: {
          name: "Untitled Board",
          lists: [],
          image: "https://images.pexels.com/photos/2865404/pexels-photo-2865404.jpeg",
        },
      };

      state.boards = R.mergeRight(state.boards, newBoard);
    },
    removeBoard: (state = initialState, action: PayloadAction<{ boardId: string }>) => {
      const { boardId } = action.payload;
      if (boardId in state.boards) {
        const currentFavorites = state.favorites;
        const updatedFavorites = currentFavorites.filter((id) => id !== boardId);
        state.favorites = updatedFavorites;

        delete state.boards[boardId];
      }
    },
    addListToBoard: (state, action: PayloadAction<{ boardId: string; listId: string }>) => {
      const { boardId, listId } = action.payload;
      const board = state.boards[boardId];
      const updatedLists = R.concat(board.lists, [listId]);
      board.lists = updatedLists;
    },
    removeListFromBoard: (state, action: PayloadAction<{ boardId: string; listId: string }>) => {
      const { boardId, listId } = action.payload;
      const board = state.boards[boardId];
      const updatedLists = board.lists.filter((id) => id !== listId);
      board.lists = updatedLists;
    },
    updateBoard: (state, action: PayloadAction<{ boardId: string; updatedName: string }>) => {
      const { boardId, updatedName } = action.payload;
      state.boards[boardId].name = updatedName;
      state.editing = "";
    },
    setEditing: (state, action: PayloadAction<{ boardId: string }>) => {
      const { boardId } = action.payload;
      state.editing = boardId;
    },
    updateBoardImage: (state, action: PayloadAction<{ boardId: string; imageURL: string }>) => {
      const { boardId, imageURL } = action.payload;
      const board = state.boards[boardId];
      board.image = imageURL;
    },
    updateFavorites: (state, action: PayloadAction<{ boardId: string }>) => {
      const { boardId } = action.payload;
      const currentFavorites = state.favorites;
      if (currentFavorites.includes(boardId)) {
        const updatedFavorites = currentFavorites.filter((id) => id !== boardId);
        state.favorites = updatedFavorites;
      } else {
        state.favorites = [...state.favorites, boardId];
      }
    },
    sortList: (state, action: PayloadAction<RearrangePayload>) => {
      const { boardId, droppableIndexStart, droppableIndexEnd } = action.payload;
      const board = state.boards[boardId];
      const lists = board.lists;

      const pulledOutList = lists.splice(droppableIndexStart, 1);
      lists.splice(droppableIndexEnd, 0, ...pulledOutList);
      board.lists = lists;

      state.boards = R.mergeDeepRight(state.boards, { [boardId]: board });
    },
    resetBoardState: (state) => {
      state = initialState;
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
  updateBoardImage,
  setEditing,
  sortList,
  updateFavorites,
  resetBoardState,
} = slice.actions;

export default slice.reducer;

export const rearrange =
  (rearrangePayload: RearrangePayload) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { type } = rearrangePayload;
    if (type === "list") {
      dispatch(slice.actions.sortList(rearrangePayload));
    }

    if (type === "card") {
      dispatch(sortCards(rearrangePayload));
    }
  };
