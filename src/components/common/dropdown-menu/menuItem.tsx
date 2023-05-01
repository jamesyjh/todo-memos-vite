import { useState } from "react";
import { RxCheck, RxCross1 } from "react-icons/rx";
import styled from "styled-components";

interface DropdownMenuItemProps {
	children: React.ReactNode;
	handleClick: (e: any) => void;
	requiresConfirmation?: boolean;
}

interface StyledMenuItemProps {
	isConfirmingAction: boolean;
}

const DropdownMenuItem = ({ children, handleClick, requiresConfirmation }: DropdownMenuItemProps) => {
	const [isConfirmingAction, setConfirmingAction] = useState(false);

	return (
		<StyledMenuItem
			isConfirmingAction={isConfirmingAction}
			onClick={(e) => (requiresConfirmation ? setConfirmingAction(true) : handleClick(e))}
		>
			{children}
			{isConfirmingAction ? (
				<ConfirmActionContainer>
					<RxCheck id="confirm" size={24} onClick={handleClick} />
					<RxCross1
						id="cancel"
						size={24}
						onClick={(e) => {
							e.stopPropagation();
							setConfirmingAction(false);
						}}
					/>
				</ConfirmActionContainer>
			) : null}
		</StyledMenuItem>
	);
};

export const ConfirmActionContainer = styled.div`
	display: flex;
	border-radius: 20px;
	background: rgba(255, 255, 255, 1);

	> svg {
		align-self: center;
		padding: 5px;
		border-radius: 50%;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
			cursor: pointer;
		}

		&:active {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}

	#confirm {
		color: #509850;
	}
	#cancel {
		color: #b53535;
	}
`;

export const StyledMenuItem = styled.div<StyledMenuItemProps>`
	display: flex;
	align-self: center;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
	padding: 8px 20px;
	min-height: 40px;
	cursor: ${(props) => (props.isConfirmingAction ? "default" : "pointer")};
	z-index: 9999;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export default DropdownMenuItem;
