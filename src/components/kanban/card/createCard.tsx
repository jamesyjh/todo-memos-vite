import React, { useRef, useState } from "react";
import styled from "styled-components";
import TextArea from "react-textarea-autosize";
import { Button, ButtonContainer } from "../../common/buttons/Button";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { createCard } from "../../../redux/slices/kanban/cards";
import { useAppDispatch } from "../../../redux/store";

interface CreateCardProps {
	listId: string;
}

const CreateCard = ({ listId }: CreateCardProps) => {
	const dispatch = useAppDispatch();
	const newCardFormRef = useRef(null);
	const [isFormOpen, setFormOpen] = useState(false);
	const [cardTitle, setCardTitle] = useState("");

	const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => e.target.select();

	const handleOpenForm = () => {
		setFormOpen(true);
	};

	const handleCloseForm = () => {
		setFormOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCardTitle(e.target.value);
	};

	const handleAddCard = () => {
		if (cardTitle !== "") {
			dispatch(createCard(cardTitle, listId));
			setCardTitle("");
			setFormOpen(false);
		}
	};

	return (
		<>
			{isFormOpen ? (
				<FormContainer>
					<NewCardForm ref={newCardFormRef}>
						<StyledTextArea
							autoFocus
							placeholder={"Enter card title ..."}
							value={cardTitle}
							onFocus={handleFocus}
							onChange={handleInputChange}
							// onBlur={handleCloseForm}
						/>
					</NewCardForm>
					<NewCardActionContainer>
						<Button onClick={handleAddCard}>Add Card</Button>
						<Button onClick={handleCloseForm}>
							<MdClose size={20} />
						</Button>
					</NewCardActionContainer>
				</FormContainer>
			) : (
				<CreateCardContainer onClick={handleOpenForm}>
					<span>
						<AiOutlinePlus size={15} /> Create New Card
					</span>
				</CreateCardContainer>
			)}
		</>
	);
};

export default CreateCard;

const CreateCardContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 320px;
	background-color: transparent;
	border: 4px dotted #c9c9c9;
	border-radius: 5px;
	padding: 1rem;
	height: 100%;
	margin-bottom: 10px;
	transition: all 150ms ease-out;

	> span {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}
	&:active {
		background-color: rgba(0, 0, 0, 0.15);
	}
`;

const NewCardForm = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: all 0.2s ease-in-out;
	padding: 10px;
	height: 100px;
`;

const NewCardActionContainer = styled(ButtonContainer)`
	align-items: center;

	> svg {
		&:hover {
			cursor: pointer;
		}
	}
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 8px;
	gap: 1rem;
`;

const StyledTextArea = styled(TextArea)`
	resize: none;
	width: 100%;
	overflow: hidden;
	outline: none;
	border: none;
	min-height: 100px;
	font-weight: 600;
	font-size: 16px;
	font-family: "Lato", sans-serif;
`;
