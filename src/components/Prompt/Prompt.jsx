import React from "react";
import "./Prompt.css";

const Prompt = ({ prompt, setPrompt }) => {
  return (
    <div className="prompt__screen">
      <span className="prompt__screen__title">Prompt</span>
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
