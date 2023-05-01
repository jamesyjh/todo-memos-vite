import styled from "styled-components";
import { ActionsContainer } from "../ActionsContainer";

interface DropdownMenuProps {
	children: React.ReactNode;
	position: {
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
}

interface StyledDropdownMenuProps {
	position: {
		top?: number;
		bottom?: number;
		left?: number;
		right?: number;
	};
}

export const StyledDropdownMenu = styled.div<StyledDropdownMenuProps>`
	position: absolute;
	top: ${({ position }) => (position.top ? `${position.top}px` : "auto")};
	bottom: ${({ position }) => (position.bottom ? `${position.bottom}px` : "auto")};
	left: ${({ position }) => (position.left ? `${position.left}px` : "auto")};
	right: ${({ position }) => (position.right ? `${position.right}px` : "auto")};
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

const DropdownMenu = ({ children, position }: DropdownMenuProps) => {
	return <StyledDropdownMenu position={position}>{children}</StyledDropdownMenu>;
};

export default DropdownMenu;

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
