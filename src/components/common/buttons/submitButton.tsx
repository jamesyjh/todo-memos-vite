import React from "react";
import { ActionsContainer } from "../ActionsContainer";

interface SubmitButtonProps {
	handleOnClick: () => void;
	text: string;
	icon: React.ReactNode;
}

const SubmitButton = ({ text, icon, handleOnClick }: SubmitButtonProps) => {
	return (
		<ActionsContainer onClick={handleOnClick}>
			<div>
				{icon}
				<span>{text}</span>
			</div>
		</ActionsContainer>
	);
};

export default SubmitButton;
