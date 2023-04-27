import styled from "styled-components";

export const BoardContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding-bottom: 5rem;

	/* Add background image */
	background: ${({ image }) => (image ? `url(${image})` : "none")} no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}
`;
