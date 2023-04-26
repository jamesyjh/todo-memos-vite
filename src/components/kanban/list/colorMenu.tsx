import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";
import { ActionsContainer } from "./styles";

interface ColorMenuProps {
	onColorChange: (color: string) => void;
	currentColor: string;
}

const ColorMenu = ({ onColorChange, currentColor }: ColorMenuProps) => {
	console.log(currentColor);

	const [color, setColor] = useState(currentColor);

	const handleColorChange = () => {
		onColorChange(color);
	};

	return (
		<ColorMenuContainer>
			<input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
			<ActionsContainer onClick={handleColorChange}>
				<div>
					<FaCheckCircle size={20} />
					<span>Save</span>
				</div>
			</ActionsContainer>
		</ColorMenuContainer>
	);
};

export default ColorMenu;

const ColorMenuContainer = styled.div`
	display: flex;
	padding: 8px 20px;
	gap: 1.5rem;

	> input {
		flex: 0.25;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 50px;
		height: 50px;
		border: none;
		cursor: pointer;
	}

	> input::-webkit-color-swatch {
		border-radius: 7px;
		border: none;
	}

	> input::-moz-color-swatch {
		border-radius: 7px;
		border: none;
	}

	> ${ActionsContainer} {
		flex: 0.75;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-self: center;
		gap: 1rem;
		max-width: 100px;
		/* border: 1px solid red; */

		> div {
			display: flex;
			gap: 0.5rem;

			> svg {
				color: #898989;
			}
		}
	}
`;
