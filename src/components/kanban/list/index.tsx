import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import KanbanCard from "../card";
import {
  FormContainer,
  ListCardsContainer,
  ListContainer,
  ListForm,
  ListTitle,
  StyledInput,
  TitleContainer,
} from "./styles";
import CreateCard from "../card/createCard";
import ColorPicker from "../../menus/cardColorSettings";
import { IoMdClose, IoMdSettings } from "react-icons/io";
import { DropdownMenuCategoryHeader, DropdownSubMenuCategoryHeader } from "../../common/dropdown-menu";
import DropdownMenuItem from "../../common/dropdown-menu/menuItem";
import DropdownMenu from "../../common/dropdown-menu";
import { FaChevronLeft } from "react-icons/fa";
import { removeList, setListColor, updateListTitle } from "../../../redux/slices/kanban/lists";
import { MenuContainer } from "../../common/dropdown-menu/styles";
import { ActionsContainer } from "../../common/ActionsContainer";
import { useAppDispatch } from "../../../redux/store";

interface KanbanListProps {
  listId: string;
  title: string;
  color: string;
  index: number;
  listCards: any;
  cards: any;
}

const KanbanList = ({ cards, listId, title, listCards, index, color }: KanbanListProps) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<string[]>([]);

  const handleFinishEditing = (e: React.FocusEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateListTitle({ listId, listTitle }));
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
    dispatch(setListColor({ updatedColor: pickedColor, listId }));
  };

  const handleRemoveList = () => {
    dispatch(removeList(listId));
    setIsDropdownOpen(false);
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
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <ListContainer
          className="ml-2 min-w-[95%] sm:min-w-[340px] sm:snap-center"
          color={color}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
                        <DropdownMenu position={{ top: -10, right: 1 }}>
                          {menuStack.length === 0 ? (
                            <>
                              <DropdownMenuCategoryHeader>
                                <span>List Actions</span>
                              </DropdownMenuCategoryHeader>
                              <hr />
                              <DropdownMenuItem handleClick={handleRemoveList} requiresConfirmation>
                                Delete list
                              </DropdownMenuItem>
                              <DropdownMenuItem handleClick={(e) => handleMenuNav(e, "Choose List Color")}>
                                Set color . . .
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
                  {listCards.map((cardId: string, index: number) => (
                    <KanbanCard
                      key={cardId}
                      listId={listId}
                      cardId={cardId}
                      title={cards[cardId].title}
                      index={index}
                      color={cards[cardId].color}
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
