import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { Button, ButtonContainer } from "../../common/Button";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createList } from "../../../redux/slices/kanban/lists";
import { CreateListContainer, FormContainer, NewListActionContainer, NewListForm, StyledTextArea } from "./styles";

const CreateList = () => {
	const dispatch = useDispatch();
	const newListFormRef = useRef(null);
	const [isFormOpen, setFormOpen] = useState(false);
	const [listText, setListText] = useState("");

	const handleFocus = (e) => e.target.select();

	const handleOpenForm = () => {
		setFormOpen(true);
	};

	const handleCloseForm = () => {
		setFormOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setListText(e.target.value);
	};

	const handleAddList = () => {
		if (listText !== "") {
			dispatch(createList(listText));
			setListText("");
			setFormOpen(false);
		}
	};

	return (
		<>
			{isFormOpen ? (
				<FormContainer>
					<NewListForm ref={newListFormRef}>
						<StyledTextArea
							placeholder={"Enter list title ..."}
							autoFocus
							onFocus={handleFocus}
							value={listText}
							onChange={handleInputChange}
							// onBlur={handleCloseForm}
						/>
					</NewListForm>
					<NewListActionContainer>
						<Button onClick={handleAddList}>Add List</Button>
						<Button onClick={handleCloseForm}>
							<MdClose size={20} />
						</Button>
					</NewListActionContainer>
				</FormContainer>
			) : (
				<CreateListContainer onClick={handleOpenForm}>
					<span>
						<AiOutlinePlus size={15} /> Create New List
					</span>
				</CreateListContainer>
			)}
		</>
	);
};

export default CreateList;
