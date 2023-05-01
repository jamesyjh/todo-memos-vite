import { RefObject } from "react";
import styled from "styled-components";
import { colorMap, ColorMapKey } from "../../utils";

interface ExpandingMenuProps {
	menuRef?: RefObject<HTMLDivElement>;
	handleColorSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, key: ColorMapKey) => void;
}

const ExpandingMenu = ({ menuRef, handleColorSelect }: ExpandingMenuProps) => {
	return (
		<Menu ref={menuRef} className="expanding-menu">
			{Object.keys(colorMap).map((key) => {
				return (
					<MenuItem
						key={key}
						onClick={(e) => handleColorSelect(e, key as ColorMapKey)}
						style={{
							border: `1px solid black`,
							background: `${colorMap[key as ColorMapKey]}`,
						}}
					></MenuItem>
				);
			})}
		</Menu>
	);
};

export default ExpandingMenu;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	position: absolute;
	right: -35px;
	top: 0px;
	z-index: 9999;
`;

const MenuItem = styled.div`
	border: 2px solid black;
	border-radius: 100%;
	min-width: 30px;
	min-height: 30px;

	&:hover {
		cursor: pointer;
	}
`;
