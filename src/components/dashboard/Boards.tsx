import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { TbNewSection, TbStarOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../redux/slices/kanban/boards";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button, ButtonContainer } from "../common/buttons/Button";
import Icon from "../common/Icon";
import { SectionContainer, ThumbnailGrid, SectionHeader, PlaceholderContainer } from "./styles";
import Thumbnail from "./Thumbnail";

interface ThumbnailPlaceholderProps {
	showFavorites: boolean;
	hasFavorites: boolean;
	hasBoards: boolean;
}

const Boards = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { boards, favorites } = useAppSelector((state) => state.boards);
	const [showFavorites, setShowFavorites] = useState<boolean>(false);

	const handleAddMemo = () => {
		dispatch(createBoard());
	};

	const handleViewFavoriteBoards = () => {
		setShowFavorites((prev) => !prev);
	};

	return (
		<SectionContainer>
			<SectionHeader>
				<ButtonContainer>
					<Button onClick={handleAddMemo}>
						<Icon element={<TbNewSection size={25} />} />
					</Button>
					<Button onClick={handleViewFavoriteBoards}>
						<Icon element={<FaStar size={25} color={showFavorites ? "#ffce0c" : "#222"} />} />
					</Button>
				</ButtonContainer>
			</SectionHeader>
			<ThumbnailGrid>
				{Object.keys(boards)
					.filter((key) => (showFavorites ? favorites.includes(key) : key))
					.map((key) => {
						return (
							<div key={key} onClick={() => navigate(`/boards/${key}`)}>
								<Thumbnail key={key} id={key} {...boards[key]} isStarred={favorites.includes(key)} />
							</div>
						);
					})}
			</ThumbnailGrid>
			<ThumbnailPlaceholder
				showFavorites={showFavorites}
				hasFavorites={favorites.length > 0}
				hasBoards={Object.keys(boards).length > 0}
			/>
		</SectionContainer>
	);
};

export default Boards;

const ThumbnailPlaceholder = ({ showFavorites, hasFavorites, hasBoards }: ThumbnailPlaceholderProps) => {
	return (
		<>
			{showFavorites && !hasFavorites ? (
				<PlaceholderContainer>
					<TbStarOff size={40} />
					<h3>No favorite boards.</h3>
				</PlaceholderContainer>
			) : (
				!hasBoards && (
					<PlaceholderContainer>
						<h1>No boards yet!</h1>
						<br />
						<h3>
							Click <TbNewSection size={25} /> to create one!
						</h3>
					</PlaceholderContainer>
				)
			)}
		</>
	);
};
