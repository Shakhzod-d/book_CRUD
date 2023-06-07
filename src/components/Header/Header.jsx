import React from "react";

import "./Header.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ pathname }) => {
  const navigate = useNavigate();

  return (
    <header className="header_container">
      <h1 onClick={() => navigate(`/home`)}>Book</h1>
      <div className="header_right">
        <h2 onClick={() => navigate(pathname)}>+</h2>
      </div>
    </header>
  );
};
