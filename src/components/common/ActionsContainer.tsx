import styled from "styled-components";

export const ActionsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border-radius: 10px;
	cursor: pointer;

	> svg {
		color: #646464;
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
		> svg {
			color: #474747;
		}
	}
	&:active {
		background-color: rgba(0, 0, 0, 0.15);
	}
`;
