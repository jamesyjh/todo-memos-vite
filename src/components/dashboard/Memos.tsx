import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MemoCard from "./MemoCard";
import { SectionContainer, SectionHeader, MemoGrid } from "./styles";
import { gsap } from "gsap";
import Flip from "gsap/Flip";

import { TbNewSection, TbPinFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { addMemo, setLastSeen } from "../../redux/slices/memos";
import { Button, ButtonContainer } from "../common/Button";
import Icon from "../common/Icon";

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

	const handleViewPinnedMemos = () => {
		//TODO: write logic for this
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
						<Icon element={<TbNewSection size={25} />} />
					</Button>
					<Button onClick={handleViewPinnedMemos}>
						<Icon element={<TbPinFilled size={25} />} />
					</Button>
					{/* <Button>View All</Button> */}
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
