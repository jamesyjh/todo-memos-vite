import { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import BasicButton from "../../common/buttons/basic-button";
import { ButtonContainer } from "../../common/buttons/Button";

const ResetAppDataMenu = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAppReset = () => {
    localStorage.clear();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(0);
    }, 1200);
  };

  return (
    <div className="flex flex-col px-5 my-2 gap-1.5">
      <span className="flex justify-center">
        <h4 className="text-sm font-semibold text-[var(--palette-error-2)]">Warning!</h4>
        <div className="self-center">
          <RiErrorWarningFill size={17} className="text-[var(--palette-error-2)]" />
        </div>
      </span>
      <hr />
      <span className="text-xs text-left py-3">Are you sure you want to remove all data and reset app state?</span>
      <ButtonContainer className="flex justify-end w-[100%]">
        <BasicButton showSpinner={isLoading} color="var(--palette-error-2)" size="sm" onClick={() => handleAppReset()}>
          Confirm
        </BasicButton>
        <BasicButton color="var(--palette-info)" size="sm" onClick={() => {}}>
          Cancel
        </BasicButton>
      </ButtonContainer>
    </div>
  );
};

export default ResetAppDataMenu;
