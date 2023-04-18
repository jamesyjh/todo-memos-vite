import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Boards from "../components/dashboard/Boards";
import Memos from "../components/dashboard/Memos";
import TabMenu from "../components/navigation/TabMenu";
import { RootState } from "../redux/store";

const Dashboard = () => {
	const { activeLink } = useSelector((state: RootState) => state.app.nav);

	return (
		<DashboardContainer>
			<TabMenu />
			<ContentContainer>{activeLink === "boards" ? <Boards /> : <Memos />}</ContentContainer>
		</DashboardContainer>
	);
};

export default Dashboard;

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
