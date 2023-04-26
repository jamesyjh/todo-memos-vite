import { FaStar } from "react-icons/fa";
import { TbNewSection } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../redux/slices/kanban/boards";
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
		dispatch(createBoard());
	};

	const handleViewFavoriteBoards = () => {
		//TODO: add logic to filter by favorites
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
