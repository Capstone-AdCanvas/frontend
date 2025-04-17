import React, { useState } from "react";
import "./ImagetoVideo.css";
import GradientBox from "../../../components/GradientBox/GradientBox";
import Information from "../../../components/Information/Information";
import Prompt from "../../../components/Prompt/Prompt";
import Settings from "../../../components/Settings/Settings";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";

const ImagetoVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [videoLength, setVideoLength] = useState("");
  const [bgm, setBgm] = useState("");
  const [ratio, setRatio] = useState("");
  const [script, setScript] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const isReadyToGenerate =
    prompt.trim() !== "" &&
    videoLength &&
    bgm &&
    ratio &&
    script &&
    imageUploaded;

  return (
    <article className="imagetovideo">
      <GradientBox width={400} height={850} className="imagetovideo__options">
        <div className="imagetovideo__scrollable">
          <Information />
          <Prompt prompt={prompt} setPrompt={setPrompt} />
          <ImageUpload setImageUploaded={setImageUploaded} />
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
            className={`imagetovideo__generate ${
              isReadyToGenerate ? "active" : ""
            }`}
            disabled={!isReadyToGenerate}
          >
            생성하기
          </button>
        </div>
      </GradientBox>
    </article>
  );
};

export default ImagetoVideo;
