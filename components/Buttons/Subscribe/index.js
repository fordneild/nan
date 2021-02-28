import React, { useState, useEffect } from "react";
import "./Subscribe.scss";
import { Pipes } from "Components/Content";
import Description from "../../Description";

export default function SubscribeButton({ pipeId }) {
  const pipesContainer = Pipes.useContainer();
  const { pipes } = pipesContainer;
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsSubscribed(pipes?.filter((pipe) => pipe.id === pipeId).length > 0);
  }, [pipes]);

  const handleClick = () => {
    if (isSubscribed) {
      pipesContainer.unsubscribe(pipeId);
    } else {
      pipesContainer.subscribe(pipeId);
    }
  };

  return (
    <div onClick={handleClick}>
      {isSubscribed ? (
        <i className="far subscribe fa-minus-square"></i>
      ) : (
        <i className="far subscribe fa-plus-square"></i>
      )}
      <Description text={`${isSubscribed ? "un" : ""}subscribe`} />
    </div>
  );
}
