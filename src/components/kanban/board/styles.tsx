import styled from "styled-components";

export const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  z-index: 0;
`;

export const BoardActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  z-index: 999;
  color: #f0f0f0;
  border-radius: 5px;
  width: 30px;
  height: 30px;

  &:hover {
    cursor: pointer;
    color: #c9c9c9;
    background-color: rgba(255, 255, 255, 0.08);
  }
`;
