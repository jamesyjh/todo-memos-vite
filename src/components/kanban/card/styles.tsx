import styled from "styled-components";
import TextArea from "react-textarea-autosize";

export const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
  cursor: grab;
`;

export const CardForm = styled.form`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  padding: 7px;
  width: 100%;
  border: 2px dashed #c9c9c98e;
`;

export const CardFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 8px;
  gap: 0.5rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: transparent;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

export const StyledTextArea = styled(TextArea)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
  min-height: 100px;
  font-weight: 600;
  font-size: 16px;
  font-family: "Lato", sans-serif;
`;
