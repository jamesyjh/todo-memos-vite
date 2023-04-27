import { useState } from "react";
import { GiCheckMark, GiCancel } from "react-icons/gi";
import styled from "styled-components";

interface DropdownMenuItemProps {
	children: React.ReactNode;
	handleClick: (e: any) => void;
	requiresConfirmation?: boolean;
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
					<GiCheckMark id="confirm" size={24} onClick={handleClick} />
					<GiCancel
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

const ConfirmActionContainer = styled.div`
	display: flex;
	gap: 0.5rem;

	> svg {
		align-self: center;
		padding: 5px;
		border-radius: 50%;

		&:hover {
			background-color: rgba(0, 0, 0, 0.05);
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

export const StyledMenuItem = styled.div`
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
