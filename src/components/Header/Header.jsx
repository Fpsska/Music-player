import React from "react";
import { useSelector } from "react-redux";
import Form from "../Common/Form/Form";
import "./header.scss";

const Header = () => {
  const { isLightTheme } = useSelector((state) => state.burgerSlice);
  return (
    <header className={isLightTheme ? "header light" : "header"}>
      <Form />
    </header>
  );
};

export default Header;
