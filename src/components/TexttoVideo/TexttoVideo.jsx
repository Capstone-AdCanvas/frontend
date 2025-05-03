import React, { useState } from "react";
import "./TexttoVideo.css";
import GradientBox from "../GradientBox/GradientBox";
import Prompt from "../subcomponents/Prompt/Prompt";
import Settings from "../subcomponents/Settings/Settings";

const TexttoVideo = ({ activeTab, setActiveTab }) => {
  const [prompt, setPrompt] = useState("");
  const [videoLength, setVideoLength] = useState("");
  const [bgm, setBgm] = useState("");
  const [ratio, setRatio] = useState("");
  const [script, setScript] = useState("");

  const isReadyToGenerate =
    prompt.trim() !== "" && videoLength && bgm && ratio && script;

  if (activeTab !== "text") return null; // 비활성화시 렌더링 X

  return (
    <article className="texttovideo">
      <div className="aiVideos__initial__btn">
        <button
          className="texttovideo__btn active"
          onClick={() => setActiveTab("text")}
        >
          Text to Video
        </button>
        <button
          className="imagetovideo__btn"
          onClick={() => setActiveTab("image")}
        >
          Image to Video
        </button>
      </div>

      <div className="texttovideo__content">
        <GradientBox width={400} height={375} className="prompt">
          <Prompt prompt={prompt} setPrompt={setPrompt} />
        </GradientBox>

        <GradientBox width={400} height={400} className="settings">
          <Settings
            videoLength={videoLength}
            setVideoLength={setVideoLength}
            bgm={bgm}
            setBgm={setBgm}
            ratio={ratio}
            setRatio={setRatio}
            script={script}
            setScript={setScript}
          />
          <button
            className={`texttovideo__generate ${
              isReadyToGenerate ? "active" : ""
            }`}
            disabled={!isReadyToGenerate}
          >
            생성하기
          </button>
        </GradientBox>
      </div>
    </article>
  );
};

export default TexttoVideo;
