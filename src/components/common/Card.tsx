import React from "react";
import styled from "styled-components";

interface CardProps {
  width?: number;
  children: React.ReactNode;
  color: string;
}

const Card = ({ children, color }: CardProps) => {
  return <StyledCard color={color}>{children}</StyledCard>;
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ color }) => color};
  border-radius: 4px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  padding: 10px;
`;

export default Card;
