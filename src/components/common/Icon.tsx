import { ReactElement } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface IconButtonProps {
	element: ReactElement<IconType>;
}

interface IconContainerProps {
	icon: ReactElement<IconType>;
}

const Icon = ({ element }: IconButtonProps) => {
	return <IconContainer icon={element}>{element}</IconContainer>;
};

export default Icon;

const IconContainer = styled.i<IconContainerProps>`
	display: flex;
	justify-content: center;
	color: #292929;
	padding: 0px;
`;
