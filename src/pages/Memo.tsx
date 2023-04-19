import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonContainer } from "../components/common/Button";
import DraftEditor from "../components/editor";
import { convertToRaw, convertFromRaw } from "draft-js";

import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { saveMemo, setColor } from "../redux/slices/memos";
import { stateToHTML } from "draft-js-export-html";
import htmlParser from "react-html-parser";

import { FaChevronLeft } from "react-icons/fa";
import { InputContainer, Line } from "../components/common/Input";

const Memo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();
	const { items } = useSelector((state: RootState) => state.memos);

	const [memo] = items.filter((item) => item.id === id);

	if (!memo) {
		return <Navigate replace to="/" />;
	}

	const location = useLocation();

	if (!location.state) {
		return <Navigate replace to="/" />;
	}

	const { isEditing } = location.state;

	const [contentState, setContentState] = useState(convertFromRaw(memo.contentState));
	const [updatedTitle, setUpdatedTitle] = useState("");

	const captureEditorState = (state) => {
		setContentState(state.getCurrentContent());
	};

	const renderMemoContent = () => {
		const memoContent = stateToHTML(convertFromRaw(memo.contentState));
		return htmlParser(memoContent);
	};

	const handleSaveMemo = () => {
		const { title, id } = memo;

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
		<div>
			<MemoHeaderContainer>
				{isEditing ? (
					<InputContainer>
						<input type="text" id="title" onChange={handleTitleChange} placeholder={memo.title} />
						<Line></Line>
					</InputContainer>
				) : (
					<h1>{memo.title}</h1>
				)}
				<ButtonContainer>
					<Button onClick={() => navigate(`/`)}>
						<FaChevronLeft size={11} /> All Memos
					</Button>
					{isEditing ? (
						<Button onClick={handleSaveMemo}>Save</Button>
					) : (
						<Button onClick={() => handleEditMemo()}>Edit</Button>
					)}
					<Button>Delete</Button>
				</ButtonContainer>
			</MemoHeaderContainer>
			<ContentContainer>
				{isEditing ? (
					<DraftEditor currContentState={memo.contentState} captureEditorState={captureEditorState} />
				) : (
					<MemoContentContainer className="memo-content">{renderMemoContent()}</MemoContentContainer>
				)}
			</ContentContainer>
		</div>
	);
};

export default Memo;

const ContentContainer = styled.div`
	padding: 0.75rem;
	margin: 0.75rem;
`;

const MemoHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.75rem;
	margin: 0.75rem;
`;

const MemoContentContainer = styled.div`
	padding: 0.75rem;
	margin: 0.75rem;

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
