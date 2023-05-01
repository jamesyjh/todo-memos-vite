import styled from "styled-components";

export const InputContainer = styled.div`
	position: relative;

	> input {
		border: 0;
		outline: none;
		width: 100%;
		font-size: 1.5em;
		font-weight: bold;
		z-index: 999;
		color: #fefefe;

		background: rgba(0, 0, 0, 0.25);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.3rem;
		padding-bottom: 0.3rem;
		border-radius: 10px;

		text-align: center;

		::placeholder {
			color: #fefefe;
			font-weight: bold;
			text-align: center;
		}
	}
`;

export const Line = styled.div`
	width: 100%;
	height: 3px;
	position: absolute;
	background: #c9c9c9;
`;
