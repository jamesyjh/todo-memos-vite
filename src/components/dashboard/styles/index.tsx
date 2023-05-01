import styled from "styled-components";

export const SectionContainer = styled.section`
	display: flex;
	position: relative;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	padding: 1.25rem;
	margin-bottom: 4rem;
`;

export const SectionHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const SectionTitle = styled.h1`
	font-size: 2.5rem;
`;

export const ThumbnailGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	gap: 1.25rem;
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
`;

export const MemoGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-gap: 1.5rem;
	/* margin: 1rem 20rem; */
`;

export const PlaceholderContainer = styled.div`
	color: #fefefe;
	padding: 1rem;
	border-radius: 7px;
	background: rgba(0, 0, 0, 0.25);

	> h3 {
		display: flex;
		align-items: center;
		> svg {
			margin-left: 5px;
			margin-right: 5px;
		}
	}
`;
