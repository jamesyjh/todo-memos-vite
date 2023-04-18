import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SectionContainer, ThumbnailGrid, SectionTitle } from "./styles";
import Thumbnail from "./Thumbnail";

const Boards = () => {
  const { items } = useSelector((state: RootState) => state.boards);

  return (
    <SectionContainer>
      <SectionTitle>Boards</SectionTitle>
      <ThumbnailGrid>
        {items.map((item, index) => (
          <Thumbnail key={index} {...item} />
        ))}
      </ThumbnailGrid>
    </SectionContainer>
  );
};

export default Boards;
