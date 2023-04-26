import styled from "styled-components";
import { ActionsContainer } from "../kanban/list/styles";

export const DropdownMenu = styled.div`
	position: absolute;
	top: -10px;
	right: -200px;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	padding: 0;
	margin: 0;
	min-width: 250px;
	list-style: none;
	z-index: 9999;

	> hr {
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 8px;
		opacity: 0.4;
	}
`;

export const DropdownMenuCategoryHeader = styled.div`
	padding: 10px;
	justify-content: center;
	text-align: center;
	z-index: 9999;
	font-size: 14px;
	font-weight: 700;

	> span {
		font-weight: bold;
	}
`;

export const DropdownMenuItem = styled.div`
	font-size: 13px;
	padding: 8px 20px;
	cursor: pointer;
	z-index: 9999;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const DropdownSubMenuCategoryHeader = styled(DropdownMenuCategoryHeader)`
	display: flex;

	> ${ActionsContainer} {
		flex: 0.15;
		width: 30px;
		height: 30px;

		> svg {
			color: #222;
		}
	}

	> span {
		flex: 0.85;
		justify-content: center;
		align-self: center;
	}
`;
