import styled from "styled-components";
import { ButtonContainer } from "../../common/Button";
import TextArea from "react-textarea-autosize";

export const ListContainer = styled.div`
	background-color: ${(props) => props.color};
	height: 100%;
	margin: 0 8px 0 0;
	border-radius: 5px;
	min-width: 340px;
`;

export const ListForm = styled.form`
	display: flex;
	flex-direction: row;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: all 0.2s ease-in-out;
	padding: 10px;
	border: 4px dashed #c9c9c9;
`;

export const ListCardsContainer = styled.div`
	margin: 0 10px;
`;

export const ActionsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border-radius: 10px;
	cursor: pointer;

	> svg {
		color: #a9a9a9;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
		> svg {
			color: #797979;
		}
	}
	&:active {
		background-color: rgba(0, 0, 0, 0.15);
	}
`;

export const TitleContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 1rem;
`;

export const MenuContainer = styled.div`
	position: relative;
`;

export const StyledInput = styled.input`
	width: 100%;
	border: none;
	outline-color: transparent;
	border-radius: 3px;
	margin-bottom: 3px;
	padding: 5px;
`;

export const ListTitle = styled.h3`
	font-weight: bold;
`;

export const CreateListContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 300px;
	backdrop-filter: blur(4px); /* Add background blur effect */
	background-color: rgba(255, 255, 255, 0.35); /* Add a semi-transparent red color overlay */
	border: 4px dotted #c9c9c9;
	border-radius: 5px;
	padding: 1rem;
	height: 100%;
	transition: all 150ms ease-out;
	font-weight: bolder;

	> span {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.45); /* Add a semi-transparent red color overlay */
	}
	&:active {
		background-color: rgba(255, 255, 255, 0.55); /* Add a semi-transparent red color overlay */
	}
`;

export const NewListForm = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: all 0.2s ease-in-out;
	padding: 10px;
	height: 100px;
	min-width: 340px;
`;

export const NewListActionContainer = styled(ButtonContainer)`
	align-items: center;

	> svg {
		&:hover {
			cursor: pointer;
		}
	}
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 8px;
	gap: 1rem;
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
