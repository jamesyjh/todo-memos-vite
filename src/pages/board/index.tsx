import * as R from "ramda";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { setActiveBoard } from "../../redux/slices/kanban/boards";
import { RootState } from "../../redux/store";
import KanbanBoard from "../../components/kanban/board";
import { BoardContainer } from "./styles";

const MyBoard = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const { boards: allBoards, cards: allCards, lists: allLists } = useSelector((state: RootState) => state);
	const { boards } = allBoards;
	const { lists } = allLists;
	const { cards } = allCards;

	useEffect(() => {
		dispatch(setActiveBoard({ boardId: id }));
	}, [id]);

	if (!id || R.isNil(boards[id])) {
		return <Navigate replace to="/boards" />;
	}

	const board = boards[id];
	const listOrder = board.lists;

	return (
		<BoardContainer>
			<KanbanBoard board={board} boardId={id} listOrder={listOrder} lists={lists} cards={cards} />
		</BoardContainer>
	);
};

export default MyBoard;
