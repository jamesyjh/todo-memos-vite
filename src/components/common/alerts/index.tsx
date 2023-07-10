import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";
import { MdOutlineErrorOutline } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { setAlert } from "../../../redux/slices/app";
import styled from "styled-components";

type AlertProps = {
  title?: string;
  description?: string;
  level?: "info" | "warning" | "error" | "success";
};

const Alert = () => {
  const dispatch = useAppDispatch();
  const { alert } = useAppSelector((state) => state.app);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (alert.active) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        dispatch(setAlert(undefined));
      }, 2000);
    }
  }, [alert.active]);

  const Icon = () => {
    if (alert.active.level === "info") return <AiOutlineInfoCircle size={20} />;
    if (alert.active.level === "warning") return <AiOutlineWarning size={20} />;
    if (alert.active.level === "error") return <MdOutlineErrorOutline size={20} />;
    if (alert.active.level === "success") return <GiConfirmed size={20} />;

    return null;
  };

  if (showAlert) {
    return (
      <AlertContainer level={alert.active.level} className="rounded px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <div className="icon py-1 mr-2">
            <Icon />
          </div>
          <div>
            <p className="font-bold">{alert.active.title}</p>
            <p className="text-sm">{alert.active.description}</p>
          </div>
        </div>
      </AlertContainer>
    );
  }

  return null;
};

export default Alert;

const AlertContainer = styled.div<AlertProps>`
  background: ${({ level }) => (level ? mapLevelColor(level) : "#c9c9c9")};
  color: #000;
`;

const mapLevelColor = (level: string) => {
  if (level === "info") return "var(--palette-info)";
  if (level === "warning") return "var(--palette-warning)";
  if (level === "error") return "var(--palette-error-2)";
  if (level === "success") return "var(--palette-success)";
  return "var(--palette-info)";
};
