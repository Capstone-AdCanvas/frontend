import React from "react";
import "./Information.css";
import infoIcon from "../../../assets/logo-information.png";

const Information = () => {
  return (
    <div className="information__screen">
      <header className="information__screen__title">
        <img src={infoIcon} alt="" />
        Information
      </header>
      <div className="information__screen__main">
        <span className="information__screen__subtitle1">상품이름</span>
        <textarea
          className="information__screen__input1"
          placeholder="상품 이름"
        />
        <span className="information__screen__subtitle2">
          강조하고 싶은 상품의 기능
        </span>
        <textarea
          className="information__screen__input2"
          placeholder="상품의 기능"
        />
      </div>
    </div>
  );
};

export default Information;
