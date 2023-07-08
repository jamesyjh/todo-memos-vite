import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { TbNewSection, TbStarOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../redux/slices/kanban/boards";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import BasicButton from "../common/buttons/basic-button";
import { ButtonContainer } from "../common/buttons/Button";
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

  const handleCreateBoard = () => {
    dispatch(createBoard());
  };

  const handleViewFavoriteBoards = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <div className="flex relative flex-col flex-wrap justify-center items-center">
      <div className="flex flex-col gap-2 my-4">
        <ButtonContainer>
          <BasicButton onClick={handleCreateBoard}>
            <TbNewSection size={20} />
            <span>Add Board</span>
          </BasicButton>
          <BasicButton onClick={handleViewFavoriteBoards}>
            <FaStar size={20} color={showFavorites ? "#ffce0c" : "#ccc"} />
            <span>View Favorites</span>
          </BasicButton>
        </ButtonContainer>
      </div>
      <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(boards)
          .filter((key) => (showFavorites ? favorites.includes(key) : key))
          .map((key) => {
            return (
              <div key={key} onClick={() => navigate(`/boards/${key}`)}>
                <Thumbnail key={key} id={key} {...boards[key]} isStarred={favorites.includes(key)} />
              </div>
            );
          })}
      </div>
      {Object.keys(boards).length < 1 && (
        <ThumbnailPlaceholder
          showFavorites={showFavorites}
          hasFavorites={favorites.length > 0}
          hasBoards={Object.keys(boards).length > 0}
        />
      )}
    </div>
  );
};

export default Boards;

const ThumbnailPlaceholder = ({ showFavorites, hasFavorites, hasBoards }: ThumbnailPlaceholderProps) => {
  return (
    <>
      <div className="text-white p-7 rounded-lg bg-black bg-opacity-[40%] ">
        {showFavorites && !hasFavorites ? (
          <>
            <span className="flex flex-col items-center">
              <TbStarOff size={50} />
              <span className="font-light text-2xl">No favorite boards.</span>
            </span>
          </>
        ) : (
          !hasBoards && (
            <>
              <span className="font-semibold text-2xl">No boards yet!</span>
              <span className="flex items-center font-normal text-xl pt-5 my-5 gap-2">
                Click <TbNewSection size={30} /> to create one!
              </span>
            </>
          )
        )}
      </div>
    </>
  );
};
