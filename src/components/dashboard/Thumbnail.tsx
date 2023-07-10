import React, { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt, FaStar, FaSave, FaEdit } from "react-icons/fa";
import { RxCheck, RxCross1 } from "react-icons/rx";
import styled, { keyframes } from "styled-components";
import { updateFavorites, removeBoard, setEditing, updateBoard } from "../../redux/slices/kanban/boards";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ConfirmActionContainer } from "../common/dropdown-menu/menuItem";

interface ThumbnailProps {
  id: string;
  name: string;
  image: string;
  isStarred: boolean;
}

interface ThumbnailContainerProps {
  isEditing: boolean;
  image: string;
}

const Thumbnail = ({ id, name, image, isStarred }: ThumbnailProps) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const newThumbnailRef = useRef<HTMLDivElement>(null);

  const { editing } = useAppSelector((state) => state.boards);
  const [updatedName, setUpdatedName] = useState(name);
  const [isConfirmingAction, setConfirmingAction] = useState(false);
  const isEditing = editing === id;

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      newThumbnailRef.current?.classList.add("bounce");
    }
  }, [inputRef, newThumbnailRef]);

  const handleDeleteBoard = (): void => {
    if (isEditing) {
      dispatch(setEditing({ boardId: "" }));
    }
    dispatch(removeBoard({ boardId: id } as any));
  };

  const handleUpdateBoardThumbnail = (): void => {
    dispatch(updateBoard({ boardId: id, updatedName }));
  };

  const handleInputFocus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (isEditing) {
      e.stopPropagation();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUpdatedName(e.target.value);
  };

  const handleEditBoardThumbnail = (): void => {
    dispatch(setEditing({ boardId: id }));
  };

  const handleCancelEditBoard = (): void => {
    dispatch(setEditing({ boardId: "" }));
  };

  const handleAddToFavorites = (): void => {
    dispatch(updateFavorites({ boardId: id }));
  };

  return (
    <ThumbnailContainer
      className="w-[80vw] h-[150px] sm:h-[20vh] sm:w-[65vw]"
      isEditing={isEditing}
      image={image}
      onClick={handleInputFocus}
      ref={newThumbnailRef}
    >
      <ThumbnailActionsContainer onClick={(e) => e.stopPropagation()}>
        <FaRegTrashAlt
          id="delete"
          onClick={(e) => {
            e.stopPropagation();
            setConfirmingAction(true);
          }}
          size={20}
        />
        {isConfirmingAction ? (
          <ConfirmActionContainer ref={menuRef}>
            <RxCheck id="confirm" size={28} onClick={handleDeleteBoard} />
            <RxCross1
              id="cancel"
              size={28}
              onClick={(e) => {
                e.stopPropagation();
                setConfirmingAction(false);
              }}
            />
          </ConfirmActionContainer>
        ) : null}

        <FaStar id="favorite" onClick={handleAddToFavorites} size={20} color={isStarred ? "#ffce0c" : "#fff"} />
        {isEditing ? <FaSave id="save" onClick={handleUpdateBoardThumbnail} size={20} /> : null}
        {isEditing ? null : <FaEdit size={20} onClick={handleEditBoardThumbnail} />}
        {isEditing ? <RxCross1 size={20} onClick={handleCancelEditBoard} /> : null}
      </ThumbnailActionsContainer>
      <Overlay />
      {isEditing ? (
        <EditBoardInputContainer>
          <input ref={inputRef} type="text" id="name" onChange={handleInputChange} placeholder={name} />
        </EditBoardInputContainer>
      ) : (
        <Title>{name}</Title>
      )}
    </ThumbnailContainer>
  );
};

export default Thumbnail;

const wiggle = keyframes`
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-7deg);
  }
  20% {
    transform: rotateZ(5deg);
  }
  25% {
    transform: rotateZ(-6deg);
  }
  30% {
    transform: rotateZ(4deg);
  }
  35% {
    transform: rotateZ(-2deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }
`;

const ThumbnailContainer = styled.div<ThumbnailContainerProps>`
  position: relative;
  background: url(${(props) => props.image}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  padding: 1rem;
  color: #fefefe;
  transition: all 50ms ease;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  ${(props) => props.isEditing && `border: 3px dotted var(--palette-5-2);`}

  @media (min-width: 768px) {
    width: 18rem;
    height: 10rem;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  &.bounce {
    animation: ${wiggle} 800ms ease-out;
    animation-iteration-count: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 1rem;
  transition: all 50ms ease;
`;

const Title = styled.h3`
  position: absolute;
  right: 20px;
  bottom: 10px;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  z-index: 999;
`;

const EditBoardInputContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;

  > input {
    background: 0;
    border: 0;
    outline: none;
    width: 100%;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: right;
    color: #fefefe;

    ::placeholder {
      color: #898989;
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  }
`;

const ThumbnailActionsContainer = styled.div`
  position: absolute;
  left: 18px;
  top: 18px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-start;
  z-index: 999;

  > ${ConfirmActionContainer} {
    position: absolute;
    right: -70px;
    top: -3px;
  }

  > svg {
    &:hover {
      color: #7bd3ff;
      transition: all 200ms ease-out;
    }
  }
`;
