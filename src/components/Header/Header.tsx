import React from "react";
import { useSelector } from "react-redux";
import Form from "../Form/Form";
import "./header.scss";
import { RootState } from "../../app/store";

const Header: React.FC = () => {
  const { isLightTheme } = useSelector((state: RootState) => state.burgerSlice);

  return (
    <header className={isLightTheme ? "header light" : "header"}>
      <Form />
    </header>
  );
};

export default Header;
