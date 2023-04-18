import React, { useState } from "react";
import styled from "styled-components";
import { colorMap } from "../../utils";

const ExpandingMenu = ({ handleColorSelect }) => {
	return (
		<Menu className="expanding-menu">
			{Object.keys(colorMap).map((key) => {
				return (
					<MenuItem
						key={key}
						onClick={() => handleColorSelect(key)}
						style={{
							border: `1px solid black`,
							background: `${colorMap[key]}`,
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
	flex-direction: row;
	gap: 5px;
	position: absolute;
	right: 0px;
	top: 50px;
`;

const MenuItem = styled.span`
	border: 2px solid black;
	border-radius: 100%;
	min-width: 30px;
	min-height: 30px;

	&:hover {
		cursor: pointer;
	}
`;
