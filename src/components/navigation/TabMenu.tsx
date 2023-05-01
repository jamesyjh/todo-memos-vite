import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setNavPage } from "../../redux/slices/app";

gsap.registerPlugin(Flip);

const TabMenu = () => {
	const dispatch = useAppDispatch();
	const { activeLink } = useAppSelector((state) => state.app.nav);
	const activeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const links = document.querySelectorAll(".nav-links a");

		links.forEach((link) => {
			if (link.id === activeLink) {
				gsap.to(link, { color: "#fefefe", duration: 0.2 });

				// Move ActiveLink line
				const flipState = Flip.getState(activeRef.current);
				if (activeRef.current) {
					link.appendChild(activeRef.current);
					Flip.from(flipState, {
						duration: 0.85,
						absolute: true,
						ease: "elastic.out(1, 0.5)",
					});
				}
			} else {
				gsap.to(link, { color: "#cccccc", duration: 0.2 });
			}
		});
	}, [activeLink]);

	return (
		<TabMenuContainer>
			<nav>
				<ul className="nav-links">
					<TabMenuItem>
						<li>
							<TabMenuLink id="boards" to="#" onClick={() => dispatch(setNavPage("boards"))}>
								Boards
							</TabMenuLink>
							<ActiveLink ref={activeRef}></ActiveLink>
						</li>
					</TabMenuItem>
					<TabMenuItem>
						<li>
							<TabMenuLink id="memos" to="#" onClick={() => dispatch(setNavPage("memos"))}>
								Memos
							</TabMenuLink>
						</li>
					</TabMenuItem>
				</ul>
			</nav>
		</TabMenuContainer>
	);
};

export default TabMenu;

const TabMenuContainer = styled.div`
	margin-top: 2rem;
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.25);
	display: flex;
	align-items: center;
	align-self: center;
	justify-content: center;
	width: 200px;

	> nav {
		padding: 1rem;
		display: flex;
		justify-content: center;
	}

	> nav > ul {
		display: flex;
		list-style: none;
		gap: 1.5rem;
		margin-left: auto;
		margin-right: auto;
	}
`;

const TabMenuItem = styled.div`
	position: relative;
`;

const TabMenuLink = styled(Link)`
	text-decoration: none;
	font-weight: bold;
	font-size: 1.25rem;
`;

const ActiveLink = styled.div`
	height: 3px;
	background: #6289ff;
	border-radius: 1rem;
	position: absolute;
	left: 0;
	bottom: -8px;
	width: 100%;
`;
