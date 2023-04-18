import styled from "styled-components";

const Thumbnail = ({ title, image }) => {
  return (
    <ThumbnailContainer style={{ backgroundImage: `url(${image})` }}>
      <Title>{title}</Title>
    </ThumbnailContainer>
  );
};

export default Thumbnail;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  color: white;
  transition: all 0.3s ease;
  background-position: center;
  background-size: cover;
  width: 8.75rem;
  height: 8.75rem;

  @media (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
`;
