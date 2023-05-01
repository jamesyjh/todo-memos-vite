import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import KanbanList from "../list";
import CreateList from "../list/createList";
import { BoardActionsContainer, ListsContainer } from "./styles";
import styled from "styled-components";
import { rearrange, updateBoardImage } from "../../../redux/slices/kanban/boards";
import { Button, ButtonContainer } from "../../common/buttons/Button";
import { FaChevronLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import DropdownMenu, { DropdownMenuCategoryHeader, DropdownSubMenuCategoryHeader } from "../../common/dropdown-menu";
import DropdownMenuItem from "../../common/dropdown-menu/menuItem";

import ImagePicker from "../../menus/boardImageSettings";
import { MenuContainer } from "../../common/dropdown-menu/styles";
import { ActionsContainer } from "../../common/ActionsContainer";
import { useAppDispatch } from "../../../redux/store";

interface KanbanBoardProps {
	boardId: string;
	listOrder: [];
	board: any;
	lists: any;
	cards: any;
}

const KanbanBoard = ({ board, boardId, listOrder, lists, cards }: KanbanBoardProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const menuRef = useRef<HTMLDivElement>(null);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [menuStack, setMenuStack] = useState<string[]>([]);

	const handleDragEnd = (result: DropResult): void => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		const dragAction = rearrange({
			boardId,
			droppableIdStart: source.droppableId,
			droppableIdEnd: destination.droppableId,
			droppableIndexStart: source.index,
			droppableIndexEnd: destination.index,
			draggableId,
			type,
		});

		dispatch(dragAction as any);
	};

	const handleImageChange = (imageURL: string) => {
		console.log(imageURL);
		dispatch(updateBoardImage({ boardId, imageURL }));
	};

	const handleMenuNav = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, subMenuTitle: string): void => {
		e.stopPropagation();
		setMenuStack((prev) => [...prev, subMenuTitle]);
	};

	const handleBack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		setMenuStack((prev) => prev.slice(0, -1));
	};

	const handleOpenBoardActions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		setIsDropdownOpen(true);
		setMenuStack([]);
	};

	const handleClose = () => {
		setIsDropdownOpen(false);
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);
		return () => document.removeEventListener("click", handleOutsideClick);
	}, []);

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<BoardHeader>
				<ButtonContainer>
					<Button onClick={() => navigate(`/boards`)}>
						<FaChevronLeft size={11} /> All Boards
					</Button>
				</ButtonContainer>
				<BoardTitle>{board.name}</BoardTitle>
				<BoardActionsContainer onClick={handleOpenBoardActions}>
					<CgMoreVerticalAlt size={20} />
				</BoardActionsContainer>
			</BoardHeader>
			<MenuContainer ref={menuRef}>
				{isDropdownOpen && (
					<DropdownMenu position={{ top: 0, right: 1 }}>
						{menuStack.length === 0 ? (
							<>
								<DropdownMenuCategoryHeader>
									<span>Board Actions</span>
								</DropdownMenuCategoryHeader>
								<hr />
								<DropdownMenuItem handleClick={(e) => handleMenuNav(e, "Background Image")}>
									Change board image . . .
								</DropdownMenuItem>
							</>
						) : (
							<>
								<DropdownSubMenuCategoryHeader>
									<ActionsContainer onClick={handleBack}>
										<FaChevronLeft size={11} />
									</ActionsContainer>
									<span>{menuStack[menuStack.length - 1]}</span>
									<ActionsContainer onClick={handleClose}>
										<IoMdClose size={16} />
									</ActionsContainer>
								</DropdownSubMenuCategoryHeader>
								<hr />
								{menuStack[menuStack.length - 1] === "Background Image" && (
									<ImagePicker onImageChange={handleImageChange} currentImage={board.image} />
								)}
							</>
						)}
					</DropdownMenu>
				)}
			</MenuContainer>
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
	width: auto;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.08);
	padding: 10px;
	border-radius: 10px;
`;

const BoardHeader = styled.header`
	display: flex;
	align-items: center;
	padding: 0.75rem;
	gap: 1rem;
	backdrop-filter: blur(5px); /* Add background blur effect */
	color: #fefefe;
	justify-content: space-between;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.05);
		z-index: -1; /* Set the overlay behind other content */
	}

	> ${ButtonContainer} {
		> ${Button} {
			display: flex;
			gap: 0.8rem;
		}
	}
`;
