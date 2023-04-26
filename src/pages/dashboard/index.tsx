import { useSelector } from "react-redux";
import Boards from "../../components/dashboard/Boards";
import Memos from "../../components/dashboard/Memos";
import TabMenu from "../../components/navigation/TabMenu";
import { RootState } from "../../redux/store";
import { ContentContainer, DashboardContainer } from "./styles";

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
