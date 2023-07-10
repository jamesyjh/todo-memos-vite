import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GrRadialSelected } from "react-icons/gr";
import styled from "styled-components";
import { ActionsContainer } from "../../common/ActionsContainer";
import { ThemeSettingsContainer } from "./styles";
import SubmitButton from "../../common/buttons/submitButton";
import { Themes } from "../../../redux/slices/app/types";
import { ButtonContainer } from "../../common/buttons/Button";
import BasicButton from "../../common/buttons/basic-button";

interface ThemeSettingsProps {
  onThemeChange: (theme: any) => void;
  activeTheme: string;
  themes: Themes;
}

const PresetThemeSettings = ({ onThemeChange, activeTheme, themes }: ThemeSettingsProps) => {
  const [theme, setTheme] = useState(activeTheme);

  const handleThemeChange = () => {
    onThemeChange(theme);
  };

  const renderPresetThemeSelection = (): JSX.Element[] => {
    return Object.keys(themes)
      .filter((key: string): boolean => themes[key].type === "preset")
      .map((key: string): JSX.Element => {
        return (
          <PresetThemeSelection key={key} onClick={() => setTheme(key)}>
            <PresetThemePreviewBox background={themes[key].background} />
            <span>{themes[key].name}</span>
            {theme !== activeTheme && key === theme && <GrRadialSelected size={14} />}
            {key === activeTheme && <FaCheckCircle size={14} color={"#126e0f"} />}
          </PresetThemeSelection>
        );
      });
  };

  return (
    <ThemeSettingsContainer>
      <PresetThemesContainer>
        <>
          {renderPresetThemeSelection()}
          <ButtonContainer>
            <BasicButton onClick={handleThemeChange}>Save</BasicButton>
          </ButtonContainer>
        </>
      </PresetThemesContainer>
    </ThemeSettingsContainer>
  );
};

export default PresetThemeSettings;

const PresetThemeSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 1.25rem;

  > span {
    margin-left: 1.25rem;
    margin-right: 0.5rem;
    font-size: 13px;
  }
`;

interface PreviewBoxStyleProps {
  background: {
    url?: string;
    color?: string;
  };
}

const PresetThemePreviewBox = styled.div<PreviewBoxStyleProps>`
  width: 60px;
  height: 30px;
  border-radius: 7px;
  background: ${({ background }) =>
    background.url ? `url(${background.url}) no-repeat center center / cover` : background.color};

  &:hover {
    border: 1.25px solid black;
    cursor: pointer;
  }
`;

const PresetThemesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 1rem;

  > ${ActionsContainer} {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-self: center;
    gap: 1rem;
    min-width: 100px;

    > div {
      display: flex;
      gap: 0.5rem;

      > svg {
        color: #898989;
      }
    }
  }
`;
