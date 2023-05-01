import * as R from "ramda";
import { useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonContainer } from "../../components/common/buttons/Button";
import DraftEditor from "../../components/editor";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { saveMemo, setColor } from "../../redux/slices/memos";
import { stateToHTML } from "draft-js-export-html";
import htmlParser from "react-html-parser";

import { FaChevronLeft } from "react-icons/fa";
import { InputContainer, Line } from "../../components/common/Input";

const Memo = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const { memos } = useAppSelector((state) => state.memos);

	if (!id || R.isNil(memos[id])) {
		return <Navigate replace to="/" />;
	}

	const memo = memos[id];

	const location = useLocation();

	if (!location.state) {
		return <Navigate replace to="/" />;
	}

	const { isEditing } = location.state;

	const [contentState, setContentState] = useState(convertFromRaw(memo.contentState));
	const [updatedTitle, setUpdatedTitle] = useState("");

	const captureEditorState = (state: EditorState) => {
		setContentState(state.getCurrentContent());
	};

	const renderMemoContent = () => {
		const memoContent = stateToHTML(convertFromRaw(memo.contentState));
		return htmlParser(memoContent);
	};

	const handleSaveMemo = () => {
		const { title } = memo;

		dispatch(
			saveMemo({
				id,
				title: updatedTitle !== "" ? updatedTitle : title,
				contentState: convertToRaw(contentState),
			})
		);
		navigate(`/memos/${id}`, { state: { isEditing: false } });
	};

	const handleEditMemo = () => {
		navigate(`/memos/${id}`, { state: { isEditing: true } });
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedTitle(e.target.value);
	};

	return (
		<>
			<MemoHeader>
				<ButtonContainer>
					<Button onClick={() => navigate(`/`)}>
						<FaChevronLeft size={11} /> All Memos
					</Button>
				</ButtonContainer>
				{isEditing ? (
					<InputContainer>
						<input type="text" id="title" onChange={handleTitleChange} placeholder={memo.title} />
						<Line></Line>
					</InputContainer>
				) : (
					<h1>{memo.title}</h1>
				)}
				{isEditing ? (
					<Button onClick={handleSaveMemo}>Save</Button>
				) : (
					<Button onClick={() => handleEditMemo()}>Edit</Button>
				)}
			</MemoHeader>
			<ContentContainer>
				{isEditing ? (
					<DraftEditor currContentState={memo.contentState} captureEditorState={captureEditorState} />
				) : (
					<MemoContentContainer className="memo-content">{renderMemoContent()}</MemoContentContainer>
				)}
			</ContentContainer>
		</>
	);
};

export default Memo;

const ContentContainer = styled.div`
	position: relative;
	margin-top: 1rem;
	margin-left: 10%;
	margin-right: 10%;
	padding: 2rem 1rem;
	z-index: 99;
`;

const MemoHeader = styled.header`
	display: flex;
	align-items: center;
	padding: 0.75rem;
	backdrop-filter: blur(3px); /* Add background blur effect */
	color: #fefefe;
	justify-content: space-between;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.05);
		z-index: -1; /* Set the overlay behind other content */
	}

	> ${ButtonContainer} {
		> ${Button} {
			display: flex;
			gap: 0.8rem;
		}
	}

	> h1 {
		font-weight: 900;
		width: auto;
		text-align: center;
		background: rgba(0, 0, 0, 0.25);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		border-radius: 10px;
	}
`;

const MemoContentContainer = styled.div`
	align-items: center;
	padding: 0.75rem;
	min-height: 80vh;
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.85);

	> ul {
		margin-left: 3em;
	}

	> pre code {
		background-color: #eee;
		border: 1px solid #999;
		display: block;
		padding: 20px;
	}
`;
