import { Profile } from "@lens-protocol/widgets-react";
import React, { useState } from "react";

type FeedProps = {
  text: string;
  image?: string;
};

export function LensIntegration() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="lex mx-1 mb-5 flex-col rounded-md bg-[#FFFFFF] p-[20px] shadow-md">
      <div className="flex items-center justify-between bg-white px-4 py-2">
        <h3 className="font-bold">Lens</h3>
        <button
          className={`transform transition-transform duration-300 ${
            isVisible ? "rotate-180" : ""
          }`}
          onClick={() => setIsVisible((prevState) => !prevState)}
        >
          <i className="fas fa-caret-down"></i>
        </button>
      </div>

      {isVisible && <Profile handle="stani" />}
    </div>
  );
}
