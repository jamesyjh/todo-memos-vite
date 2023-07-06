import Boards from "../../components/dashboard/Boards";
import Memos from "../../components/dashboard/Memos";
import Header from "../../components/header";
import TabMenu from "../../components/navigation/TabMenu";
import { RootState, useAppSelector } from "../../redux/store";
import { ContentContainer, DashboardContainer } from "./styles";

const Dashboard = () => {
  const { activeLink } = useAppSelector((state) => state.app.nav);

  return (
    <DashboardContainer>
      <Header />
      <TabMenu />
      <ContentContainer>{activeLink === "boards" ? <Boards /> : <Memos />}</ContentContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
