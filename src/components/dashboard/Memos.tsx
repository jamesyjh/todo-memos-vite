import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import MemoCard from "./MemoCard";
import { SectionContainer, SectionHeader, MemoGrid, PlaceholderContainer } from "./styles";
import { gsap } from "gsap";
import Flip from "gsap/Flip";

import { TbNewSection, TbPinFilled, TbPinnedOff } from "react-icons/tb";
import { addMemo, setLastSeen } from "../../redux/slices/memos";
import { Button, ButtonContainer } from "../common/buttons/Button";
import Icon from "../common/Icon";

interface MemosPlaceholderProps {
	showPinnedMemos: boolean;
	hasPinnedMemos: boolean;
	hasMemos: boolean;
}

gsap.registerPlugin(Flip);

const Memos = () => {
	const dispatch = useAppDispatch();
	const { memos, pinned, lastSeen } = useAppSelector((state) => state.memos);

	const [activeCard, setActiveCard] = useState(lastSeen);
	const [showPinnedMemos, setShowPinnedMemos] = useState(false);

	const handleCardSelect = (index: number): void => {
		dispatch(setLastSeen({ index }));
		setActiveCard((prev: number) => (prev === index ? -1 : index));
	};

	const handleAddMemo = (): void => {
		dispatch(addMemo());
	};

	const handleViewPinnedMemos = (): void => {
		setShowPinnedMemos((prev) => !prev);
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
				absolute: false,
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
						<Icon element={<TbPinFilled size={25} color={showPinnedMemos ? "#2395ff" : "#41403e"} />} />
					</Button>
				</ButtonContainer>
			</SectionHeader>
			<MemoGrid>
				{Object.keys(memos)
					.filter((key) => (showPinnedMemos ? pinned.includes(key) : key))
					.map((key, index) => (
						<MemoCard
							key={key}
							id={key}
							isActive={index === activeCard}
							{...memos[key]}
							handleCardSelect={() => handleCardSelect(index)}
							isPinned={pinned.includes(key)}
						/>
					))}
			</MemoGrid>
			<MemosPlaceholder
				showPinnedMemos={showPinnedMemos}
				hasPinnedMemos={pinned.length > 0}
				hasMemos={Object.keys(memos).length > 0}
			/>
		</SectionContainer>
	);
};

const MemosPlaceholder = ({ showPinnedMemos, hasPinnedMemos, hasMemos }: MemosPlaceholderProps) => {
	return (
		<>
			{showPinnedMemos && !hasPinnedMemos ? (
				<PlaceholderContainer>
					<TbPinnedOff size={40} />
					<h3>No pinned memos.</h3>
				</PlaceholderContainer>
			) : (
				!hasMemos && (
					<PlaceholderContainer>
						<h1>No memos yet!</h1>
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

export default Memos;
