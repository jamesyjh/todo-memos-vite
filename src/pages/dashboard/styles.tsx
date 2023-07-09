import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 30px;

  > header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 35px;
    background-color: rgba(0, 0, 0, 0.18);
  }
`;
