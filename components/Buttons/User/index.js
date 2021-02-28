import React from "react";
import "./User.scss";
export default function User({ isActive }) {
  return (
    <div>
      {isActive ? (
        <i className="fas active user fa-user"></i>
      ) : (
        <i className="far user fa-user"></i>
      )}
    </div>
  );
}
