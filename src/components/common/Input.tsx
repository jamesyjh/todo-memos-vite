import styled from "styled-components";

export const InputContainer = styled.div`
	position: relative;

	> input {
		background: 0;
		border: 0;
		outline: none;
		width: 100%;
		font-size: 1.5em;
		font-weight: bold;
		z-index: 999;

		::placeholder {
			color: #797979;
			font-weight: bold;
		}
	}
`;

export const Line = styled.div`
	width: 100%;
	height: 3px;
	position: absolute;
	bottom: 10px;
	background: #c9c9c9;
`;
