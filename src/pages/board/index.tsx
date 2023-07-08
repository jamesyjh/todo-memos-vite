import * as R from "ramda";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { setActiveBoard } from "../../redux/slices/kanban/boards";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import KanbanBoard from "../../components/kanban/board";
import { BoardContainer } from "./styles";

const MyBoard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { boards: allBoards, cards: allCards, lists: allLists } = useAppSelector((state) => state);
  const { boards } = allBoards;
  const { lists } = allLists;
  const { cards } = allCards;

  useEffect(() => {
    if (!id || R.isNil(boards[id])) return;
    dispatch(setActiveBoard({ boardId: id }));
  }, [id]);

  if (!id || R.isNil(boards[id])) {
    return <Navigate replace to="/" />;
  }

  const board = boards[id];
  const listOrder = board.lists;

  return (
    <BoardContainer image={board.image}>
      <KanbanBoard board={board} boardId={id} listOrder={listOrder} lists={lists} cards={cards} />
    </BoardContainer>
  );
};

export default MyBoard;
