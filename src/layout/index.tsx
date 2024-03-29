import React from "react";
import styled from "styled-components";
import Alert from "../components/common/alerts";
import { useAppSelector } from "../redux/store";

interface LayoutProps {
  children: React.ReactNode;
}

interface LayoutContainerStyleProps {
  background: {
    url?: string;
    color?: string;
  };
}

const Layout = ({ children }: LayoutProps) => {
  const { themes, activeTheme, alert } = useAppSelector((state) => state.app);

  return (
    <LayoutContainer background={themes[activeTheme].background}>
      {children}
      {alert.active && (
        <div className="fixed bottom-3 left-0 right-0 mx-auto max-w-[80vw] sm:max-w-[40vw] md:max-w-[25vw] lg:max-w-[20vw]">
          <Alert />
        </div>
      )}
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.main<LayoutContainerStyleProps>`
  position: relative;
  min-height: 100vh;
  background: ${({ background }) =>
    background.url ? `url(${background.url}) no-repeat center center` : background.color};

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: scroll;

  @media (min-width: 768px) {
    background-attachment: fixed;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
  }

  > footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.075);
  }
`;
