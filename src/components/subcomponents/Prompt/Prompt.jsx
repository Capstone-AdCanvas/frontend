import React from "react";
import "./Prompt.css";
import promptIcon from "../../../assets/logo-prompt.png";

const Prompt = ({ prompt, setPrompt }) => {
  return (
    <div className="prompt__screen">
      <span className="prompt__screen__title">
        <img src={promptIcon} alt="" />
        Prompt
      </span>
      <textarea
        className="prompt__screen__input"
        placeholder="프롬프트 예시들"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>
  );
};

export default Prompt;
