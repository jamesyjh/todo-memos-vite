import styled from "styled-components";

interface BoardContainerStyleProps {
  image: string;
}

export const BoardContainer = styled.div<BoardContainerStyleProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  /* Add background image */
  background: ${({ image }) => (image ? `url(${image})` : "none")} no-repeat center center;
  background-attachment: scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media (min-width: 768px) {
    background-attachment: fixed;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.35);
  }
`;
