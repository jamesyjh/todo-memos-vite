import React, { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../../common/buttons/Button";
import { MdClose } from "react-icons/md";
import { createList } from "../../../redux/slices/kanban/lists";
import { CreateListContainer, FormContainer, NewListActionContainer, NewListForm, StyledTextArea } from "./styles";
import { useAppDispatch } from "../../../redux/store";
import BasicButton from "../../common/buttons/basic-button";

const CreateList = () => {
  const dispatch = useAppDispatch();
  const newListFormRef = useRef(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [listText, setListText] = useState("");

  const handleFocus = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.select();
  };

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
        <FormContainer className="sm:snap-center mx-2">
          <NewListForm ref={newListFormRef}>
            <StyledTextArea
              placeholder={"Enter list title ..."}
              autoFocus
              onFocus={handleFocus}
              value={listText}
              onChange={handleInputChange}
            />
          </NewListForm>
          <NewListActionContainer>
            <BasicButton onClick={handleAddList}>Add List</BasicButton>
            <BasicButton onClick={handleCloseForm}>
              <MdClose size={20} />
            </BasicButton>
          </NewListActionContainer>
        </FormContainer>
      ) : (
        <CreateListContainer className="sm:snap-center mr-2" onClick={handleOpenForm}>
          <span>
            <AiOutlinePlus size={15} />
            Create New List
          </span>
        </CreateListContainer>
      )}
    </>
  );
};

export default CreateList;
