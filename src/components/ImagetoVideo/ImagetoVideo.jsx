import React, { useState, useEffect } from "react";
import "./ImagetoVideo.css";
import GradientBox from "../GradientBox/GradientBox";
import Information from "../subcomponents/Information/Information";
import Prompt from "../subcomponents/Prompt/Prompt";
import Settings from "../subcomponents/Settings/Settings";
import ImageUpload from "../subcomponents/ImageUpload/ImageUpload";
import { createImageToVideo, convertImageToUrl, pollVideoStatus } from "../../api/video";

const ImagetoVideo = ({ activeTab, setActiveTab, setIsReadyToGenerate, handleGenerate, onExhibitionButtonClick }) => {
  const [prompt, setPrompt] = useState("");
  const [videoLength, setVideoLength] = useState("");
  const [bgm, setBgm] = useState("");
  const [ratio, setRatio] = useState("");
  const [script, setScript] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const isReady = prompt.trim() !== "" && videoLength && bgm && ratio && script && imageUploaded;

  useEffect(() => {
    setIsReadyToGenerate(isReady);
  }, [prompt, videoLength, bgm, ratio, script, imageUploaded]);

  const handleGenerateVideo = async () => {
    if (!isReady) return;

    setIsGenerating(true);
    setError(null);

    // 3분(180초) 대기 후 저장된 영상 보여주기
    setTimeout(() => {
      const fixedVideoUrl = 'http://localhost:8080/videos/시연화장품 영상.mp4';
      handleGenerate([fixedVideoUrl]);
      setIsGenerating(false);
    }, 180000); // 180,000ms = 3분
  };

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
          <ImageUpload 
            setImageUploaded={setImageUploaded} 
            setImageFile={setImageFile}
          />
          <Settings
            videoLength={videoLength}
            setVideoLength={setVideoLength}
            bgm={bgm}
            setBgm={setBgm}
            ratio={ratio}
            setRatio={setRatio}
            script={script}
            setScript={setScript}
            activeTab={activeTab}
          />
          {error && <div className="imagetovideo__error">{error}</div>}
          <button
            className={`imagetovideo__generate ${isReady ? "active" : ""}`}
            disabled={!isReady || isGenerating}
            onClick={handleGenerateVideo}
          >
            {isGenerating ? "생성 중..." : "생성하기"}
          </button>
          <div style={{ marginTop: '24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              className="imagetovideo__exhibition"
              type="button"
              onClick={onExhibitionButtonClick}
              style={{ width: '100%', height: '48px', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px' }}
            >
              전시용 버튼
            </button>
          </div>
        </div>
      </GradientBox>
    </article>
  );
};

export default ImagetoVideo;
