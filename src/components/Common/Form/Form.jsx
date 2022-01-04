import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import SvgTemplate from "../SvgTemplaye";
import { switchPlaylistPageStatus } from "../../../app/mainSlice";
import "./form.scss";

const Form = () => {
  const { isPlaylistPage } = useSelector((state) => state.mainSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1);
    dispatch(switchPlaylistPageStatus(false));
    console.log("DSFSDF");
  };
  return (
    <form className="form" action="#">
      <button className="form__button">
        {isPlaylistPage ? (
          <SvgTemplate id="arrow-back" onClick={goBack} />
        ) : (
          <SvgTemplate id="menu" />
        )}
      </button>
      <input className="form__input" type="text" />
      <button className="form__button" type="submit">
        {isPlaylistPage ? (
          <SvgTemplate id="mixer" />
        ) : (
          <SvgTemplate id="search" />
        )}
      </button>
    </form>
  );
};

export default Form;
