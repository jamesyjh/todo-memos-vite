import Boards from "../../components/dashboard/Boards";
import Header from "../../components/header";
import { DashboardContainer } from "./styles";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header />
      <Boards />
    </DashboardContainer>
  );
};

export default Dashboard;
