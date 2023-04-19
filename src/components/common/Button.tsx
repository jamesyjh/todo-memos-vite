import styled from "styled-components";

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: center;
	background-color: #fff;
	background-image: none;
	background-position: 0 90%;
	background-repeat: repeat no-repeat;
	background-size: 4px 3px;
	border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
	border-style: solid;
	border-width: 2px;
	box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
	box-sizing: border-box;
	color: #41403e;
	cursor: pointer;
	display: inline-block;
	font-family: "Lato", sans-serif;
	font-weight: 600;
	font-size: 1rem;
	line-height: 23px;
	outline: none;
	padding: 0.55rem;
	text-decoration: none;
	transition: all 170ms ease-in-out;
	border-bottom-left-radius: 15px 255px;
	border-bottom-right-radius: 225px 15px;
	border-top-left-radius: 255px 15px;
	border-top-right-radius: 15px 225px;

	> svg {
		display: block;
		margin: auto;
	}

	&:hover {
		box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
		transform: translate3d(0, 1px, 0);
		color: #898989;

		border-bottom-left-radius: 35px 255px;
		border-bottom-right-radius: 225px 35px;
		border-top-left-radius: 255px 35px;
		border-top-right-radius: 35px 225px;
	}

	&:hover > i {
		color: #898989;
		transition: all 235ms ease-in-out;
	}

	&:focus {
		box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-self: flex-end;
	gap: 0.5rem;
	z-index: 999;
`;
