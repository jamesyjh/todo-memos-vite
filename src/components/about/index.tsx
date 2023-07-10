import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils";

const AppInformation = () => {
  const [updated, setUpdated] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/jamesyjh/todo-memos-vite");

        if (response.ok) {
          const data = await response.json();
          setUpdated(data.updated_at);
          setImage(data.owner.avatar_url);
        } else {
          throw new Error("Error fetching last commit");
        }
      } catch (error) {
        console.error("Error fetching last commit:", error);
      }
    };

    fetchData();
  }, []);

  if (!updated) {
    return null;
  }

  const handleNavigate = (): void => {
    window.location.href = "https://github.com/jamesyjh/todo-memos-vite";
  };

  return (
    <div className="flex flex-col mx-5 my-4 text-[#191919]">
      <div className="flex gap-0.5 hover:cursor-pointer">
        <span className="self-center text-xs text-left" onClick={handleNavigate}>
          Created by <strong>jamesyjh</strong>
        </span>
        <span
          onClick={handleNavigate}
          className="rounded-full h-[20px] w-[20px] self-center"
          style={{ backgroundImage: `url(${image})`, backgroundSize: "contain" }}
        />
      </div>
      <span className="text-xs text-left">Last updated - {formatDate(updated)}</span>
    </div>
  );
};

export default AppInformation;
