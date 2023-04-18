import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MemoCard from "./MemoCard";
import { SectionContainer, SectionTitle, MemoGrid } from "./styles";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import styled from "styled-components";

import { VscNewFile } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { addMemo, setLastSeen } from "../../redux/slices/memos";
import { Button, ButtonContainer } from "../common/Button";

gsap.registerPlugin(Flip);

const Memos = () => {
	const dispatch = useDispatch();
	const { items, lastSeen } = useSelector((state: RootState) => state.memos);

	const [activeCard, setActiveCard] = useState(lastSeen);

	const handleCardSelect = (index) => {
		dispatch(setLastSeen({ index }));
		setActiveCard(index);
	};

	const handleAddMemo = () => {
		dispatch(addMemo());
	};

	useEffect(() => {
		const cards = document.querySelectorAll(".memo-card");
		cards.forEach((card, index) => {
			const state = Flip.getState(cards);
			if (index === activeCard) {
				card.classList.add("active");
				card.classList.remove("inactive");
			} else {
				card.classList.add("inactive");
				card.classList.remove("active");
			}

			Flip.from(state, {
				duration: 0.25,
				ease: "expo.inout",
				absolute: true,
			});
		});
	});

	return (
		<SectionContainer>
			<SectionHeader>
				<ButtonContainer>
					<Button onClick={handleAddMemo}>
						<AddButton size={40} />
					</Button>
					<Button>View All</Button>
				</ButtonContainer>
			</SectionHeader>
			<MemoGrid>
				{items.map((item, index) => (
					<MemoCard key={index} {...item} handleCardSelect={() => handleCardSelect(index)} />
				))}
			</MemoGrid>
		</SectionContainer>
	);
};

export default Memos;

const SectionHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const ViewMoreButton = styled.button``;

const AddButton = styled(VscNewFile)`
	display: flex;
	justify-content: center;
	color: #292929;
	padding: 5px;
`;
