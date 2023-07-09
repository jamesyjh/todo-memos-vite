import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { IoMdClose, IoMdSettings } from "react-icons/io";
import styled from "styled-components";
import { updateAppTheme } from "../../redux/slices/app";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionsContainer } from "../common/ActionsContainer";
import DropdownMenu, { DropdownMenuCategoryHeader, DropdownSubMenuCategoryHeader } from "../common/dropdown-menu";
import DropdownMenuItem from "../common/dropdown-menu/menuItem";
import { MenuContainer } from "../common/dropdown-menu/styles";
import ResetAppDataMenu from "../menus/app/resetData";
import { CustomThemeSettings, PresetThemeSettings } from "../menus/themes";

const Header = () => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<string[]>([]);

  const { themes, activeTheme } = useAppSelector((state) => state.app);

  const handleThemeChange = (themeId: any) => {
    dispatch(updateAppTheme({ themeId }));
  };

  const handleMenuNav = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, subMenuTitle: string): void => {
    e.stopPropagation();
    setMenuStack((prev) => [...prev, subMenuTitle]);
  };

  const handleBack = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    setMenuStack((prev) => prev.slice(0, -1));
  };

  const handleOpenAppActions = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsDropdownOpen(true);
    setMenuStack([]);
  };

  const handleClose = () => {
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick as any);
    return () => document.removeEventListener("click", handleOutsideClick as any);
  }, []);

  return (
    <StyledHeader>
      <HeaderActionsContainer onClick={handleOpenAppActions as any}>
        <IoMdSettings size={20} />
      </HeaderActionsContainer>

      <MenuContainer ref={menuRef}>
        {isDropdownOpen && (
          <DropdownMenu position={{ top: 15, right: 1 }}>
            {menuStack.length === 0 ? (
              <>
                <DropdownMenuCategoryHeader>
                  <span>General Settings</span>
                </DropdownMenuCategoryHeader>
                <hr />
                <DropdownMenuItem handleClick={(e) => handleMenuNav(e, "Theme Settings")}>
                  Themes . . .
                </DropdownMenuItem>
                <DropdownMenuItem handleClick={(e) => handleMenuNav(e, "Reset App State")}>
                  Reset data and storage . . .
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownSubMenuCategoryHeader>
                  <ActionsContainer onClick={handleBack as any}>
                    <FaChevronLeft size={11} />
                  </ActionsContainer>
                  <span>{menuStack[menuStack.length - 1]}</span>
                  <ActionsContainer onClick={handleClose}>
                    <IoMdClose size={16} />
                  </ActionsContainer>
                </DropdownSubMenuCategoryHeader>
                <hr />
                {menuStack[menuStack.length - 1] === "Theme Settings" && (
                  <>
                    <DropdownMenuItem handleClick={(e) => handleMenuNav(e, "Preset Themes")}>
                      Preset themes . . .
                    </DropdownMenuItem>
                  </>
                )}

                {menuStack[menuStack.length - 1] === "Custom Themes" && (
                  <CustomThemeSettings onThemeChange={handleThemeChange} currentTheme={themes[activeTheme]} />
                )}

                {menuStack[menuStack.length - 1] === "Preset Themes" && (
                  <PresetThemeSettings onThemeChange={handleThemeChange} activeTheme={activeTheme} themes={themes} />
                )}

                {menuStack[menuStack.length - 1] === "Reset App State" && <ResetAppDataMenu />}
              </>
            )}
          </DropdownMenu>
        )}
      </MenuContainer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > pre {
    color: #a9a9a9;

    > a:visited {
      color: #bfbfbf;
    }
  }
`;

const HeaderActionsContainer = styled(ActionsContainer)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
