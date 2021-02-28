import React, { useState } from "react";
import "./Heart.scss";
export default function Heart({
    initialIsLiked = false,
    onSelectCallback = () => {},
    onDeselectCallback = () => {}
}) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);

    const handleClick = () => {
        if (isLiked) {
            // then we are unliking it
            unlikeMeme(id);
            setIsLiked(false);
            onDeselectCallback();
        } else {
            likeMeme(id);
            setIsLiked(true);
            onSelectCallback();
        }
    };

    return (
        <div>
            {isLiked ? (
                <i className="fas fa-heart liked" onClick={handleClick}></i>
            ) : (
                <i className="far fa-heart unliked" onClick={handleClick}></i>
            )}
            {/* <Description text={`${isLiked ? "un" : ""}like`} /> */}
        </div>
    );
}
