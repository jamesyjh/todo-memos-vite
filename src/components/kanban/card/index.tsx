import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { CardContainer } from "./styles";
import Card from "../../common/Card";

interface KanbanCardProps {
	index: number;
	listId: string;
	cardId: string;
	title: string;
}

const KanbanCard = ({ index, listId, cardId, title }: KanbanCardProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [cardTitle, setTitle] = useState(title);

	return (
		<Draggable draggableId={cardId} index={index}>
			{(provided) => (
				<CardContainer
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					onDoubleClick={() => setIsEditing(true)}
				>
					<Card>
						{/* <EditButton onMouseDown={() => setIsEditing(true)} fontSize="small">
							edit
						</EditButton>
						<DeleteButton fontSize="small" onMouseDown={handleDeleteCard}>
							delete
						</DeleteButton> */}

						<CardContent>
							<p>{title}</p>
						</CardContent>
						<CardActionsContainer>
							<FaEdit size={20} onClick={() => console.log("handle edit card")} />
							<FaRegTrashAlt size={20} onClick={() => console.log("handle delete card")} />
						</CardActionsContainer>
					</Card>
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
	flex-direction: column;
	justify-content: center;
	gap: 0.5rem;
	flex: 0.1;
	z-index: 999;
	justify-content: flex-start;
	color: #c9c9c9;

	> svg {
		&:hover {
			cursor: pointer;
			color: #888888;
			transition: all 200ms ease-out;
		}
	}
`;
