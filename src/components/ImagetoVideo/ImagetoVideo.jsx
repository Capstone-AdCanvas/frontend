import React, { useState } from "react";
import "./ImagetoVideo.css";
import GradientBox from "../GradientBox/GradientBox";
import Information from "../subcomponents/Information/Information";
import Prompt from "../subcomponents/Prompt/Prompt";
import Settings from "../subcomponents/Settings/Settings";
import ImageUpload from "../subcomponents/ImageUpload/ImageUpload";

const ImagetoVideo = ({ activeTab, setActiveTab }) => {
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

  if (activeTab !== "image") return null;

  return (
    <article className="imagetovideo">
      <div className="aiVideos__initial__btn">
        <button
          className="texttovideo__btn"
          onClick={() => setActiveTab("text")}
        >
          Text to Video
        </button>
        <button
          className="imagetovideo__btn active"
          onClick={() => setActiveTab("image")}
        >
          Image to Video
        </button>
      </div>

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
