import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";
import { ActionsContainer } from "../common/ActionsContainer";

interface BoardImageMenuProps {
  onImageChange: (image: string) => void;
  currentImage: string;
}

const BoardImageMenu = ({ onImageChange, currentImage }: BoardImageMenuProps) => {
  const [imageURL, setImageURL] = useState(currentImage);

  const handleImageChange = () => {
    onImageChange(imageURL);
  };

  return (
    <BoardImageMenuContainer>
      <ImagePreview imagePreview={imageURL} />

      <label htmlFor="image-url-input">Image URL:</label>
      <input id="image-url-input" type="text" value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
      <ActionsContainer onClick={handleImageChange}>
        <div>
          <FaCheckCircle size={20} />
          <span>Apply</span>
        </div>
      </ActionsContainer>
    </BoardImageMenuContainer>
  );
};

export default BoardImageMenu;

const BoardImageMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 20px;

  > label {
    font-size: 13px;
    margin-bottom: 0.5rem;
  }

  > input {
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: auto;
    margin-bottom: 0.5rem;
  }

  > ${ActionsContainer} {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-self: center;
    max-width: 100px;
    width: 100px;

    > div {
      display: flex;
      gap: 0.5rem;

      > svg {
        color: #898989;
      }
    }
  }
`;

interface ImagePreviewProps {
  imagePreview: string;
}

const ImagePreview = styled.div<ImagePreviewProps>`
  background: ${({ imagePreview }) => (imagePreview ? `url(${imagePreview})` : "none")} no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  border: 1px solid #c9c9c9;
  border-radius: 5px;
  margin-bottom: 1rem;
  height: 125px;
`;
