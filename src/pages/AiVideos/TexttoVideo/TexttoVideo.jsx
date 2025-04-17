import React, { useState } from "react";
import "./TexttoVideo.css";
import GradientBox from "../../../components/GradientBox/GradientBox";
import Prompt from "../../../components/Prompt/Prompt";
import Settings from "../../../components/Settings/Settings";

const TexttoVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [videoLength, setVideoLength] = useState("");
  const [bgm, setBgm] = useState("");
  const [ratio, setRatio] = useState("");
  const [script, setScript] = useState("");

  const isReadyToGenerate =
    prompt.trim() !== "" && videoLength && bgm && ratio && script;

  return (
    <article className="texttovideo">
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
    </article>
  );
};

export default TexttoVideo;
