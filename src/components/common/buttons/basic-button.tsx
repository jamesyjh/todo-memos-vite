import React from "react";
import styled from "styled-components";
import LoadingAnimation from "../../../assets/animations/loading";

interface StyledButtonProps {
  color?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ color }) => (color ? color : "var(--palette-5-2)")};
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
    background-color: ${({ color }) => (color ? color : "#603bbe")};
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
  color?: string;
  size?: "sm" | "md" | "lg" | undefined;
  showSpinner?: boolean;
}

const BasicButton = (props: BasicButtonProps) => {
  const className = `flex self-center gap-1 text-white font-normal 
	${props.size === "sm" ? "px-2.5 py-1.5 text-xs" : ""}
	${props.size === "md" ? "px-3 py-2 text-sm" : ""}
	${props.size === "lg" ? "px-3.5 py-2.5 text-md" : ""}
	${!props.size ? "px-3 py-2 text-sm" : ""}
	`;
  return (
    <StyledButton color={props.color} onClick={props.onClick} className={className}>
      {props.showSpinner && <LoadingAnimation />}
      {props.children}
    </StyledButton>
  );
};

export default BasicButton;
