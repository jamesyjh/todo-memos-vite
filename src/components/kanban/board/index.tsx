import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import KanbanList from "../list";
import CreateList from "../list/createList";
import { BoardActionsContainer, ListsContainer } from "./styles";
import styled from "styled-components";
import { rearrange, setEditing, updateBoard, updateBoardImage } from "../../../redux/slices/kanban/boards";
import { Button, ButtonContainer } from "../../common/buttons/Button";
import { FaChevronLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import DropdownMenu, { DropdownMenuCategoryHeader, DropdownSubMenuCategoryHeader } from "../../common/dropdown-menu";
import DropdownMenuItem, { ConfirmActionContainer } from "../../common/dropdown-menu/menuItem";

import ImagePicker from "../../menus/boardImageSettings";
import { MenuContainer } from "../../common/dropdown-menu/styles";
import { ActionsContainer } from "../../common/ActionsContainer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import BasicButton from "../../common/buttons/basic-button";
import { RxCheck, RxCross1, RxReset } from "react-icons/rx";

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

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<string[]>([]);
  const [updatedBoardName, setUpdatedBoardName] = useState(board.name);
  const { editing } = useAppSelector((state) => state.boards);
  const isEditing = editing === boardId;

  const handleEditBoard = (): void => {
    dispatch(setEditing({ boardId }));
    setIsDropdownOpen(false);
  };

  const handleUpdateBoard = (): void => {
    dispatch(updateBoard({ boardId, updatedName: updatedBoardName }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUpdatedBoardName(e.target.value);
  };

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

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.classList.add("bounce");
    }
  }, [inputRef]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardHeader>
        <ButtonContainer>
          <BasicButton onClick={() => navigate(`/boards`)}>
            <FaChevronLeft size={13} />
            <span className="hidden sm:block">All Boards</span>
          </BasicButton>
        </ButtonContainer>
        {isEditing ? (
          <div className="flex gap-2">
            <EditBoardInputContainer>
              <input
                autoFocus
                ref={inputRef}
                type="text"
                id="name"
                onChange={handleInputChange}
                placeholder={board.name}
              />
            </EditBoardInputContainer>
            <ConfirmActionContainer>
              <RxCheck id="confirm" size={24} onClick={handleUpdateBoard} />
              <RxCross1
                id="cancel"
                size={24}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setEditing({ boardId: "" }));
                }}
              />
            </ConfirmActionContainer>
          </div>
        ) : (
          <span className="font-bold w-auto text-center bg-opacity-20 bg-white py-2 px-4 rounded-2xl">
            {board.name}
          </span>
        )}

        <BoardActionsContainer onClick={handleOpenBoardActions}>
          <CgMoreVerticalAlt size={20} />
        </BoardActionsContainer>
      </BoardHeader>
      <MenuContainer ref={menuRef}>
        {isDropdownOpen && (
          <DropdownMenu position={{ top: 60, right: 1 }}>
            {menuStack.length === 0 ? (
              <>
                <DropdownMenuCategoryHeader>
                  <span>Board Actions</span>
                </DropdownMenuCategoryHeader>
                <hr />
                <DropdownMenuItem handleClick={(e) => handleMenuNav(e, "Background Image")}>
                  Change board image . . .
                </DropdownMenuItem>
                <DropdownMenuItem handleClick={handleEditBoard}>Edit board name . . .</DropdownMenuItem>
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
                {menuStack[menuStack.length - 1] === "Edit Board Name" && <div></div>}
              </>
            )}
          </DropdownMenu>
        )}
      </MenuContainer>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <ListsContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex min-h-[100vh] overflow-x-auto pt-[64px] sm:snap-proximity sm:snap-x"
          >
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

const BoardHeader = styled.header`
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  align-items: center;
  padding: 0.75rem;
  gap: 1rem;
  backdrop-filter: blur(5px);
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
    align-self: center;
    > ${Button} {
      display: flex;
      gap: 0.8rem;
    }
  }
`;

const EditBoardInputContainer = styled.div`
  > input {
    background: #fefefe4a;
    border: 2px dotted #c9c9c9af;
    border-radius: 0.5em;
    outline: none;
    width: 100%;
    height: 40px;
    font-size: 1;
    font-weight: bold;
    text-align: center;
    color: #fefefe;

    ::placeholder {
      color: #cacaca;
      font-size: 1;
      font-weight: bold;
      font-family: "Lato", sans-serif;
      margin-bottom: 0.5rem;
    }
  }
`;
