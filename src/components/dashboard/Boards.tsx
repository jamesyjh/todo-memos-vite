import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { TbNewSection } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createBoard } from "../../redux/slices/boards";
import { RootState } from "../../redux/store";
import { Button, ButtonContainer } from "../common/Button";
import Icon from "../common/Icon";
import { SectionContainer, ThumbnailGrid, SectionTitle, SectionHeader } from "./styles";
import Thumbnail from "./Thumbnail";

const Boards = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { boards } = useSelector((state: RootState) => state.boards);

	const handleAddMemo = () => {
		console.log("add new board!");
		dispatch(createBoard());
	};

	const handleViewFavoriteBoards = () => {
		console.log("view favorite boards!");
	};
	return (
		<SectionContainer>
			<SectionHeader>
				<ButtonContainer>
					<Button onClick={handleAddMemo}>
						<Icon element={<TbNewSection size={25} />} />
					</Button>
					<Button onClick={handleViewFavoriteBoards}>
						<Icon element={<FaStar size={25} />} />
					</Button>
				</ButtonContainer>
			</SectionHeader>
			<ThumbnailGrid>
				{Object.keys(boards).map((key) => {
					return (
						<div key={key} onClick={() => navigate(`/boards/${key}`)}>
							<Thumbnail key={key} id={key} {...boards[key]} />
						</div>
					);
				})}
			</ThumbnailGrid>
		</SectionContainer>
	);
};

export default Boards;
