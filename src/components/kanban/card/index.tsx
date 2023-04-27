import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { FaChevronLeft } from "react-icons/fa";
import { CgMoreVerticalAlt } from "react-icons/cg";
import styled from "styled-components";
import { CardContainer, CardForm, CardFormContainer, StyledInput } from "./styles";
import Card from "../../common/Card";
import { useDispatch } from "react-redux";
import { ActionsContainer, MenuContainer } from "../list/styles";
import { DropdownMenuCategoryHeader, DropdownSubMenuCategoryHeader } from "../../common/DropdownMenu";
import DropdownMenuItem from "../../common/DropdownMenuItem";
import DropdownMenu from "../../common/DropdownMenu";
import { removeCard, updateCardTitle } from "../../../redux/slices/kanban/cards";

interface KanbanCardProps {
	index: number;
	listId: string;
	cardId: string;
	title: string;
}

const KanbanCard = ({ index, listId, cardId, title }: KanbanCardProps) => {
	const dispatch = useDispatch();
	const menuRef = useRef<HTMLDivElement>(null);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [cardTitle, setCardTitle] = useState(title);
	const [menuStack, setMenuStack] = useState<string[]>([]);

	const handleFinishEditing = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateCardTitle({ cardId, cardTitle }));
		setIsEditing(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCardTitle(e.target.value);
	};

	const handleFocus = () => {};

	const handleOpenCardActions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

	const handleOutsideClick = (e: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
			setIsDropdownOpen(false);
		}
	};

	const handleEditCard = () => {};

	const handleDeleteCard = () => {
		dispatch(removeCard(listId, cardId));
		setIsDropdownOpen(false);
	};

	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);
		return () => document.removeEventListener("click", handleOutsideClick);
	}, []);

	return (
		<Draggable draggableId={cardId} index={index}>
			{(provided) => (
				<CardContainer
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					onDoubleClick={() => setIsEditing(true)}
				>
					{isEditing ? (
						<CardFormContainer>
							<CardForm onSubmit={handleFinishEditing}>
								<StyledInput
									type="text"
									value={cardTitle}
									onChange={handleInputChange}
									autoFocus
									onFocus={handleFocus}
									onBlur={handleFinishEditing}
								/>
							</CardForm>
						</CardFormContainer>
					) : (
						<>
							<MenuContainer ref={menuRef}>
								{isDropdownOpen && (
									<DropdownMenu position={{ top: 50, right: -220 }}>
										{menuStack.length === 0 ? (
											<>
												<DropdownMenuCategoryHeader>
													<span>Card Actions</span>
												</DropdownMenuCategoryHeader>
												<hr />
												<DropdownMenuItem handleClick={handleEditCard}>Edit card</DropdownMenuItem>
												<DropdownMenuItem handleClick={handleDeleteCard} requiresConfirmation>
													Delete card
												</DropdownMenuItem>
												<DropdownMenuItem handleClick={(e) => handleMenuNav(e, "Card Label")}>
													Set label
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
												{/* {menuStack[menuStack.length - 1] === "Choose List Color" && (
														<ColorPicker onColorChange={handleColorChange} currentColor={color} />
													)} */}
											</>
										)}
									</DropdownMenu>
								)}
							</MenuContainer>
							<Card>
								<CardContent>
									<p>{title}</p>
								</CardContent>
								<CardActionsContainer onClick={handleOpenCardActions}>
									<CgMoreVerticalAlt size={20} />
								</CardActionsContainer>
							</Card>
						</>
					)}
				</CardContainer>
			)}
		</Draggable>
	);
};

export default KanbanCard;

const CardContent = styled.div`
	padding: 1rem;
	flex: 0.9;
`;

const CardActionsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-self: center;
	align-items: center;
	flex: 0.1;
	z-index: 999;
	color: #898989;
	/* border: 1px solid red; */
	border-radius: 5px;
	width: 30px;
	height: 30px;

	&:hover {
		cursor: pointer;
		color: #595959;
		background-color: rgba(0, 0, 0, 0.1);
	}
`;
