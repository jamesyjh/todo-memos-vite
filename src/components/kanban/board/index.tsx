import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import KanbanList from "../list";
import CreateList from "../list/createList";
import { ListsContainer } from "./styles";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { rearrange } from "../../../redux/slices/kanban/boards";
import { Button, ButtonContainer } from "../../common/Button";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const KanbanBoard = ({ board, boardId, listOrder, lists, cards }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleDragEnd = (result: DropResult): void => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		dispatch(
			rearrange({
				boardId,
				droppableIdStart: source.droppableId,
				droppableIdEnd: destination.droppableId,
				droppableIndexStart: source.index,
				droppableIndexEnd: destination.index,
				draggableId,
				type,
			})
		);
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<BoardHeader>
				<ButtonContainer>
					<Button onClick={() => navigate(`/boards`)}>
						<FaChevronLeft size={11} /> All Boards
					</Button>
				</ButtonContainer>
				<BoardTitle>{board.name}</BoardTitle>
			</BoardHeader>
			<Droppable droppableId="all-lists" direction="horizontal" type="list">
				{(provided) => (
					<ListsContainer {...provided.droppableProps} ref={provided.innerRef}>
						{listOrder.map((listId: string, index: number) => {
							const list = lists[listId];

							if (list) {
								return (
									<KanbanList
										cards={cards}
										listId={listId}
										key={listId}
										title={list.title}
										color={list.color}
										listCards={list.cards}
										index={index}
									/>
								);
							}
						})}
						{provided.placeholder}
						<CreateList />
					</ListsContainer>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default KanbanBoard;

const BoardTitle = styled.h2`
	font-weight: 900;
	flex: 0.5;
	width: 100%;
`;

const BoardHeader = styled.header`
	display: flex;
	align-items: center;
	padding: 5px;
	margin-top: 10px;
	margin-bottom: 10px;
	margin-left: 10px;
	gap: 1rem;

	> ${ButtonContainer} {
		> ${Button} {
			display: flex;
			gap: 0.8rem;
		}
	}
`;
