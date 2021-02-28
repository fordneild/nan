import React, { useState } from "react";
import { repostMeme, unrepostMeme } from "Routes";
import "./Repost.scss";

export default function Repost({ id, initIsReposted = false }) {
  const [isReposted, setIsReposted] = useState(initIsReposted);

  const handleClick = () => {
    if (isReposted) {
      // then we are unreposting it
      setIsReposted(false);
      unrepostMeme(id);
    } else {
      setIsReposted(true);
      repostMeme(id);
    }
  };

  return (
    <div>
      <span onClick={handleClick} className="fa-stack">
        <i className="fas fa-retweet fa-stack-1x"></i>
        <i
          style={{
            color: "#E68984",
            opacity: 0.8,
            display: isReposted ? "block" : "none",
          }}
          className={`fa fa-ban fa-stack-2x `}></i>
      </span>
      {/* <Description text={`${isReposted ? "un" : ""}repost`} /> */}
    </div>
  );
}
