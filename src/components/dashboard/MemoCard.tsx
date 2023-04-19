import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, ButtonContainer } from "../common/Button";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";
import htmlParser from "react-html-parser";
import { useDispatch } from "react-redux";
import { removeMemo, setColor } from "../../redux/slices/memos";
import { MdOutlineFormatColorFill, MdClose } from "react-icons/md";
import ExpandingMenu from "../common/ExpandingMenu";
import { colorMap } from "../../utils";

const MemoCard = ({ title, id, color, contentState, handleCardSelect }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const memoCardRef = useRef(null);
	const buttonRef = useRef(null);

	const renderMemoBody = () => {
		const memoContent = stateToHTML(convertFromRaw(contentState));
		return htmlParser(memoContent);
	};

	const handleEditMemo = () => {
		navigate(`/memos/${id}`, { state: { isEditing: true } });
	};

	const handleDeleteMemo = () => {
		dispatch(removeMemo({ id }));
	};

	const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

	const handleColorSelect = (colorKey: string) => {
		dispatch(setColor({ id, color: colorKey }));
		toggleMenu();
	};

	return (
		<>
			<MemoCardContainer ref={memoCardRef} color={colorMap[color]} className="memo-card" onClick={handleCardSelect}>
				<MemoCardHeader>
					<h2>{title}</h2>
					<Button ref={buttonRef} onClick={toggleMenu}>
						{isMenuOpen ? <MdClose size={20} /> : <MdOutlineFormatColorFill size={20} />}
					</Button>

					{isMenuOpen && <ExpandingMenu handleColorSelect={handleColorSelect} />}
				</MemoCardHeader>
				<MemoContentPreview className="content-preview">{renderMemoBody()}</MemoContentPreview>
				<ButtonContainer>
					<Button onClick={() => navigate(`/memos/${id}`, { state: { isEditing: false } })}>View</Button>
					<Button onClick={handleEditMemo}>Edit</Button>
					<Button onClick={handleDeleteMemo}>Delete</Button>
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
`;

const MemoCardContainer = styled.div`
	/* max-height: 20rem; */
	border-radius: 1rem;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	grid-column: span 3;
	font-size: 1.2 rem;
	padding: 2rem;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	gap: 2rem;
	overflow: hidden;
	min-width: 300px;
	max-height: 100%;
	background: ${(props) => props.color};
	border: 2px solid ${(props) => props.color};

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
		grid-column: span 2;
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
