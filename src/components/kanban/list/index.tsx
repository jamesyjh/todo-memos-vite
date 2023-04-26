import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import KanbanCard from "../card";
import {
	ActionsContainer,
	FormContainer,
	ListCardsContainer,
	ListContainer,
	ListForm,
	ListTitle,
	MenuContainer,
	StyledInput,
	TitleContainer,
} from "./styles";
import CreateCard from "../card/createCard";
import ColorPicker from "./colorMenu";
import { useDispatch } from "react-redux";
import { IoMdSettings } from "react-icons/io";
import {
	DropdownMenu,
	DropdownMenuCategoryHeader,
	DropdownMenuItem,
	DropdownSubMenuCategoryHeader,
} from "../../common/DropdownMenu";
import { FaChevronLeft } from "react-icons/fa";
import { setListColor } from "../../../redux/slices/kanban/lists";

interface KanbanListProps {
	listId: string;
	title: string;
	color: string;
	index: number;
	listCards: any;
	cards: any;
}

const KanbanList = ({ cards, listId, title, listCards, index, color }: KanbanListProps) => {
	const dispatch = useDispatch();
	const menuRef = useRef<HTMLDivElement>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [listTitle, setListTitle] = useState(title);
	const [menuStack, setMenuStack] = useState<string[]>([]);

	const handleFinishEditing = () => {
		setIsEditing(false);
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setListTitle(e.target.value);
	};

	const handleFocus = () => {};

	const handleOpenListActions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		setIsDropdownOpen(true);
		setMenuStack([]);
	};

	const handleMenuNav = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, subMenuTitle: string): void => {
		e.stopPropagation();
		setMenuStack((prev) => [...prev, subMenuTitle]);
	};

	const handleBack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		setMenuStack((prev) => prev.slice(0, -1));
	};

	const handleColorChange = (pickedColor: string) => {
		console.log(pickedColor);
		dispatch(setListColor({ updatedColor: pickedColor, listId }));
	};

	const handleRemoveList = () => {
		console.log("removing this list");
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
		<Draggable draggableId={listId} index={index}>
			{(provided) => (
				<ListContainer color={color} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<Droppable droppableId={listId} type="card">
						{(provided) => (
							<>
								{isEditing ? (
									<FormContainer>
										<ListForm onSubmit={handleFinishEditing}>
											<StyledInput
												type="text"
												value={listTitle}
												onChange={handleInputChange}
												autoFocus
												onFocus={handleFocus}
												onBlur={handleFinishEditing}
											/>
										</ListForm>
									</FormContainer>
								) : (
									<>
										<TitleContainer onClick={() => setIsEditing(true)}>
											<ListTitle>{listTitle}</ListTitle>
											<ActionsContainer onClick={handleOpenListActions}>
												<IoMdSettings size={18} />
											</ActionsContainer>
										</TitleContainer>

										<MenuContainer ref={menuRef}>
											{isDropdownOpen && (
												<DropdownMenu>
													{menuStack.length === 0 ? (
														<>
															<DropdownMenuCategoryHeader>
																<span>List Actions</span>
															</DropdownMenuCategoryHeader>
															<hr />
															<DropdownMenuItem onClick={handleRemoveList}>Remove List</DropdownMenuItem>
															<DropdownMenuItem onClick={(e) => handleMenuNav(e, "Choose List Color")}>
																Set Color
															</DropdownMenuItem>
														</>
													) : (
														<>
															<DropdownSubMenuCategoryHeader>
																<ActionsContainer onClick={handleBack}>
																	<FaChevronLeft size={11} />
																</ActionsContainer>
																<span>{menuStack[menuStack.length - 1]}</span>
															</DropdownSubMenuCategoryHeader>
															<hr />
															{menuStack[menuStack.length - 1] === "Choose List Color" && (
																<ColorPicker onColorChange={handleColorChange} currentColor={color} />
															)}
														</>
													)}
												</DropdownMenu>
											)}
										</MenuContainer>
									</>
								)}

								<ListCardsContainer {...provided.droppableProps} ref={provided.innerRef}>
									{listCards.map((cardId, index) => (
										<KanbanCard
											key={cardId}
											listId={listId}
											cardId={cardId}
											title={cards[cardId].title}
											index={index}
										/>
									))}
									{provided.placeholder}
									<CreateCard listId={listId} />
								</ListCardsContainer>
							</>
						)}
					</Droppable>
				</ListContainer>
			)}
		</Draggable>
	);
};

export default KanbanList;
