import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--palette-5-2);
  border: 1px solid transparent;
  border-radius: 0.6rem;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  text-decoration: none #6b7280 solid;
  transition: 200ms background-color, border-color, color, fill, stroke cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  > span,
  svg {
    justify-content: center;
    align-self: center;
    align-content: center;
  }

  &:hover {
    background-color: #603bbe;
  }

  &:focus {
    box-shadow: none;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

interface BasicButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const BasicButton = (props: BasicButtonProps) => (
  <StyledButton onClick={props.onClick} className="flex gap-2 px-3 py-2 text-white text-sm font-normal">
    {props.children}
  </StyledButton>
);

export default BasicButton;
