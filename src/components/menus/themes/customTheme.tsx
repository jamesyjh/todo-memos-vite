import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ActionsContainer } from "../../common/ActionsContainer";
import { ThemeSettingsContainer } from "./styles";

interface ThemeSettingsProps {
  onThemeChange: (theme: any) => void;
  currentTheme: any;
}

const CustomThemeSettings = ({ onThemeChange, currentTheme }: ThemeSettingsProps) => {
  const [theme, setTheme] = useState(currentTheme);

  const handleThemeChange = () => {
    onThemeChange(theme);
  };

  return (
    <ThemeSettingsContainer>
      <input type="color" value={theme} onChange={(event) => setTheme(event.target.value)} />
      <ActionsContainer onClick={handleThemeChange}>
        <div>
          <FaCheckCircle size={20} />
          <span>Save</span>
        </div>
      </ActionsContainer>
    </ThemeSettingsContainer>
  );
};

export default CustomThemeSettings;
