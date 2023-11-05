import React from "react";
import { SUBTITLE, TITLE } from "../utils/constants";

const Header = () => {
  return (
    <div>
      <header className="header">
        <h1 className="title">{TITLE}</h1>
        <h4 className="sub-title">{SUBTITLE}</h4>
      </header>
    </div>
  );
};

export default Header;
