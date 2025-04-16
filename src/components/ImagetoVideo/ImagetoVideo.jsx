import React from "react";
import "./ImagetoVideo.css";
import GradientBox from "../GradientBox/GradientBox";

const ImagetoVideo = () => {
  return (
    <GradientBox
      width={400}
      height={800}
      backgroundColor={"#282e37"}
      className="information"
    >
      <div className="information__screen">
        <span className="information__screen__title">information</span>
        <input
          className="information__screen__input"
          type="text"
          placeholder="프롬프트 예시들"
        />
      </div>
    </GradientBox>
  );
};

export default ImagetoVideo;
