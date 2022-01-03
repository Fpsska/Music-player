import React from "react";
import SvgTemplate from "../SvgTemplaye";
import "./form.scss";

const Form = () => {
  return (
    <form className="form" action="#">
      <button className="form__button">
        <SvgTemplate id="menu" />
      </button>
      <input className="form__input" type="text" />
      <button className="form__button" type="submit">
        <SvgTemplate id="search" />
      </button>
    </form>
  );
};

export default Form;
