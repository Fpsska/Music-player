import React from "react";
import "./form.scss";

const Form = () => {
  return (
    <form className="form" action="#">
      <button className="form__button" type="submit"></button>
      <input className="form__input" type="text" />
    </form>
  );
};

export default Form;
