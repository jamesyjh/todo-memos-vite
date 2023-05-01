import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import htmlParser from "react-html-parser";
import { MdOutlineFormatColorFill, MdClose } from "react-icons/md";
import ExpandingMenu from "../common/ExpandingMenu";
import { Button, ButtonContainer } from "../common/buttons/Button";
import { setColor, removeMemo, updatePinnedMemos } from "../../redux/slices/memos";
import { colorMap, ColorMapKey } from "../../utils";
import { TbPinFilled } from "react-icons/tb";
import { ConfirmActionContainer } from "../common/dropdown-menu/menuItem";
import { RxCheck, RxCross1 } from "react-icons/rx";
import { useAppDispatch } from "../../redux/store";

export interface MemoCardProps {
	title: string;
	id: string;
	color: ColorMapKey;
	isPinned: boolean;
	contentState: RawDraftContentState;
	isActive: boolean;
	handleCardSelect: () => void;
}

const MemoCard = ({ title, id, color, contentState, isPinned, isActive, handleCardSelect }: MemoCardProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const menuRef = useRef<HTMLDivElement>(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isConfirmingAction, setConfirmingAction] = useState(false);

	const memoCardRef = useRef(null);
	const buttonRef = useRef(null);

	const renderMemoBody = () => {
		const memoContent = stateToHTML(convertFromRaw(contentState));
		return htmlParser(memoContent);
	};

	const handleEditMemo = () => {
		navigate(`/memos/${id}`, { state: { isEditing: true } });
	};

	const handleDeleteMemo = (e: any) => {
		e.stopPropagation();
		dispatch(removeMemo({ id }));
	};

	const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setIsMenuOpen((prevState) => !prevState);
	};

	const handleColorSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, colorKey: ColorMapKey) => {
		e.stopPropagation();
		dispatch(setColor({ id, color: colorKey }));
	};

	const handlePinMemo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		dispatch(updatePinnedMemos({ id }));
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
			setIsMenuOpen(false);
			setConfirmingAction(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);
		return () => document.removeEventListener("click", handleOutsideClick);
	}, []);

	const renderColorSettingsButton = () => {
		if (!isActive) {
			return null;
		} else {
			return isMenuOpen ? (
				<Button ref={buttonRef} onClick={toggleMenu}>
					<MdClose size={20} />
				</Button>
			) : (
				<Button ref={buttonRef} onClick={toggleMenu}>
					<MdOutlineFormatColorFill size={20} />
				</Button>
			);
		}
	};

	return (
		<>
			<MemoCardContainer
				ref={memoCardRef}
				color={colorMap[color as ColorMapKey]}
				className="memo-card"
				onClick={handleCardSelect}
			>
				<MemoCardHeader>
					<h2>{title}</h2>
					<CustomButtonContainer>
						{renderColorSettingsButton()}

						<Button onClick={handlePinMemo}>
							<TbPinFilled size={20} color={isPinned ? "#2395ff" : "#41403e"} />
						</Button>
					</CustomButtonContainer>

					{isMenuOpen && <ExpandingMenu menuRef={menuRef} handleColorSelect={handleColorSelect} />}
				</MemoCardHeader>
				<MemoContentPreview className="content-preview">{renderMemoBody()}</MemoContentPreview>
				<ButtonContainer>
					<Button onClick={() => navigate(`/memos/${id}`, { state: { isEditing: false } })}>View</Button>
					<Button onClick={handleEditMemo}>Edit</Button>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							setConfirmingAction(true);
						}}
					>
						Delete
					</Button>
					{isConfirmingAction ? (
						<ConfirmActionContainer ref={menuRef}>
							<RxCheck id="confirm" size={28} onClick={handleDeleteMemo} />
							<RxCross1
								id="cancel"
								size={28}
								onClick={(e) => {
									e.stopPropagation();
									setConfirmingAction(false);
								}}
							/>
						</ConfirmActionContainer>
					) : null}
				</ButtonContainer>
			</MemoCardContainer>
		</>
	);
};

export default MemoCard;

const MemoCardHeader = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
	position: relative;
	gap: 1.5;
`;

const MemoCardContainer = styled.div`
	/* max-height: 20rem; */
	position: relative;
	border-radius: 1rem;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	grid-column: span 3;
	font-size: 1.2 rem;
	padding: 2rem 3rem;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	gap: 2rem;
	overflow: hidden;
	min-width: 300px;
	max-height: 100%;
	background: ${(props) => props.color};
	border: 2px solid ${(props) => props.color};
	z-index: 99;

	> .content-preview {
		width: 100%;
		height: 100%;
		padding: 10px;
		position: relative;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		-webkit-line-clamp: 15; /* number of lines to show before truncating */
	}

	&.active {
		grid-column: 1 / span 6;
		grid-row: 1;
		order: 0;
		height: auto;
		max-height: 40vh;
		min-width: 500px;
		cursor: default;

		> .content-preview {
			display: block;
		}

		> .content-preview::after {
			content: "";
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0px;
			top: 0px;
			background: linear-gradient(to bottom, transparent, ${(props) => props.color});
		}
	}

	&.inactive {
		grid-column: span 3;
		padding: 2rem 2rem;

		> .content-preview {
			display: none;
		}
		> div > button {
			display: none;
		}

		> header > button {
			display: none;
		}

		> header > .expanding-menu {
			display: none;
		}
	}
`;

const MemoContentPreview = styled.div`
	text-align: left;
	overflow: hidden;
`;

const CustomButtonContainer = styled(ButtonContainer)`
	flex-direction: column;
`;
