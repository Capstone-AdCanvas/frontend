import React, { useState, useEffect } from "react";
import "./ImagetoVideo.css";
import GradientBox from "../GradientBox/GradientBox";
import Information from "../subcomponents/Information/Information";
import Prompt from "../subcomponents/Prompt/Prompt";
import Settings from "../subcomponents/Settings/Settings";
import ImageUpload from "../subcomponents/ImageUpload/ImageUpload";
import { createImageToVideo, convertImageToUrl, pollVideoStatus } from "../../api/video";

const ImagetoVideo = ({ activeTab, setActiveTab, setIsReadyToGenerate, handleGenerate }) => {
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

    try {
      setIsGenerating(true);
      setError(null);

      console.log('Starting video generation with:', {
        prompt,
        videoLength,
        ratio,
        imageFile
      });

      // 이미지를 URL로 변환
      const imageUrl = await convertImageToUrl(imageFile);
      console.log('Converted image URL:', imageUrl);

      // 비디오 생성 요청
      console.log('Sending API request to create video...');
      const response = await createImageToVideo(
        prompt,
        imageUrl,
        videoLength.replace('s', ''), // '5s' -> '5'
        ratio
      );
      console.log('API Response:', response);

      // 폴링 시작
      console.log('Starting polling with requestId:', response.requestId);
      pollVideoStatus(
        response.requestId,
        (status) => {
          console.log('Video generation completed:', status);
          setIsGenerating(false);
          handleGenerate(status.videoUrl);
        },
        (error) => {
          console.error('Error during polling:', error);
          setIsGenerating(false);
          setError(error.message || '비디오 생성 중 오류가 발생했습니다.');
        }
      );
    } catch (error) {
      console.error('Error in handleGenerateVideo:', error);
      setIsGenerating(false);
      setError(error.message || '비디오 생성 중 오류가 발생했습니다.');
    }
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
        </div>
      </GradientBox>
    </article>
  );
};

export default ImagetoVideo;
