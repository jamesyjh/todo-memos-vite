import * as R from "ramda";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { setActiveBoard } from "../redux/slices/boards";
import { RootState } from "../redux/store";

type Props = {};

const MyBoard = (props: Props) => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const { boards, cards, lists } = useSelector((state: RootState) => state);
	const { boards: currentBoards } = boards;

	useEffect(() => {
		dispatch(setActiveBoard({ boardId: id }));
	}, [id]);

	if (!id || R.isNil(currentBoards[id])) {
		return <Navigate replace to="/boards" />;
	}

	const board = currentBoards[id];
	const listOrder = board.lists;

	return <div>{board.name}</div>;
};

export default MyBoard;
