import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setNavPage } from "../../redux/slices/app";

gsap.registerPlugin(Flip);

const TabMenu = () => {
	const dispatch = useDispatch();
	const { activeLink } = useSelector((state: RootState) => state.app.nav);
	const activeRef = useRef(null);

	useEffect(() => {
		const links = document.querySelectorAll(".nav-links a");

		links.forEach((link) => {
			if (link.id === activeLink) {
				gsap.to(link, { color: "#7374b2", duration: 0.2 });

				// Move ActiveLink line
				const flipState = Flip.getState(activeRef.current);
				link.appendChild(activeRef.current);
				Flip.from(flipState, {
					duration: 0.75,
					absolute: true,
					ease: "elastic.out(1, 0.5)",
				});
			} else {
				gsap.to(link, { color: "#252525", duration: 0.2 });
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
	border-radius: 999em;
	background-color: #c9c9c9;
	display: flex;
	align-items: center;
	align-self: center;
	justify-content: center;
	width: 400px;

	> nav {
		padding: 1rem;
		display: flex;
		justify-content: center;
	}

	> nav > ul {
		display: flex;
		list-style: none;
		gap: 3.75rem;
	}
`;

const TabMenuItem = styled.div`
	position: relative;
`;

const TabMenuLink = styled(Link)`
	text-decoration: none;
	color: #252525;
	font-weight: bold;
	font-size: 1.75rem;
`;

const ActiveLink = styled.div`
	height: 3px;
	background: #7374b2;
	border-radius: 1rem;
	position: absolute;
	left: 0;
	bottom: -8px;
	width: 100%;
`;
