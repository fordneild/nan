import React, { useState } from "react";
import { reportMeme, unreportMeme } from "Routes";
import Description from "Components/Description";
import "./Report.scss";

export default function Report({ id, initIsReported = false }) {
  const [isReported, setIsReported] = useState(initIsReported);

  const handleClick = () => {
    if (isReported) {
      // then we are unreporting it
      setIsReported(false);
      unreportMeme(id);
    } else {
      setIsReported(true);
      reportMeme(id);
    }
  };

  return (
    <div className="report-button">
      <span onClick={handleClick} className="fa-stack">
        <i className="fas fa-flag fa-stack-1x"></i>
        <i
          style={{
            color: "#E68984",
            opacity: 0.8,
            display: isReported ? "block" : "none",
          }}
          className={`fa fa-ban fa-stack-2x `}></i>
      </span>
      <Description text={`${isReported ? "un" : ""}report meme`} />
    </div>
  );
}
