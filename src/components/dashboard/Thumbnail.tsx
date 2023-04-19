import { FaRegTrashAlt, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeBoard } from "../../redux/slices/boards";
import { Button, ButtonContainer } from "../common/Button";
import { ActionsContainer } from "./styles";

const Thumbnail = ({ id, name, image, isEditing }) => {
	const dispatch = useDispatch();

	const handleDeleteBoard = () => {
		dispatch(removeBoard({ boardId: id }));
	};
	return (
		<ThumbnailContainer isEditing={isEditing} image={image}>
			<ActionsContainer onClick={(e) => e.stopPropagation()}>
				<FaRegTrashAlt id="delete" onClick={handleDeleteBoard} size={20} />
				<FaStar id="favorite" onClick={() => console.log("add to favorites!")} size={20} />
			</ActionsContainer>
			<Overlay />
			<Title>{name}</Title>
		</ThumbnailContainer>
	);
};

export default Thumbnail;

const ThumbnailContainer = styled.div`
	position: relative;
	background: url(${(props) => props.image});
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	padding: 1.5rem;
	color: #fefefe;
	transition: all 0.3s ease;
	width: 10.75rem;
	height: 8.75rem;
	border-radius: 1rem;
	cursor: pointer;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	${(props) => props.isEditing && `border: 2px solid #007bff;`}

	@media (min-width: 768px) {
		width: 18rem;
		height: 10rem;
	}

	&:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		transform: translateY(-5px);
	}
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6); /* Change the alpha value to adjust the darkness */
	border-radius: 1rem;
	transition: all 0.3s ease;
`;

const Title = styled.h3`
	position: absolute;
	right: 20px;
	bottom: 10px;
	margin-bottom: 0.5rem;
	font-size: 1.25rem;
	font-weight: bold;
	z-index: 999;
`;
