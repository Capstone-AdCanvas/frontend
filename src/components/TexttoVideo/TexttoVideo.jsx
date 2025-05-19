import React, { useState, useEffect } from "react";
import "./TexttoVideo.css";
import GradientBox from "../GradientBox/GradientBox";
import Prompt from "../subcomponents/Prompt/Prompt";
import Settings from "../subcomponents/Settings/Settings";
import { createTextToVideo, pollTextVideoStatus } from "../../api/video";

const TexttoVideo = ({ activeTab, setActiveTab, setIsReadyToGenerate, handleGenerate }) => {
  const [prompt, setPrompt] = useState("");
  const [videoLength, setVideoLength] = useState("");
  const [bgm, setBgm] = useState("");
  const [ratio, setRatio] = useState("");
  const [script, setScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const isReady = prompt.trim() !== "" && videoLength && bgm && ratio && script;

  // 상위에 준비 여부 전달
  useEffect(() => {
    setIsReadyToGenerate(isReady);
  }, [prompt, videoLength, bgm, ratio, script]);

  const handleGenerateClick = async () => {
    if (!isReady) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // 비디오 생성 API 호출
      const response = await createTextToVideo(
        prompt,
        videoLength.replace('s', ''), // '10s' -> '10'
        ratio
      );
      
      // requestId 배열 추출
      const requestIds = response.map(item => item.requestId);
      
      // 폴링 시작
      pollTextVideoStatus(
        requestIds,
        (videoUrls) => {
          console.log('모든 비디오가 생성되었습니다:', videoUrls);
          setIsGenerating(false);
          handleGenerate();
        },
        (error) => {
          console.error('비디오 생성 중 오류 발생:', error);
          setError(error.message);
          setIsGenerating(false);
        }
      );
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setError(error.message);
      setIsGenerating(false);
    }
  };

  if (activeTab !== "text") return null;

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
            activeTab={activeTab}
          />
          {error && <div className="texttovideo__error">{error}</div>}
          <button
            className={`texttovideo__generate ${isReady ? "active" : ""}`}
            disabled={!isReady || isGenerating}
            onClick={handleGenerateClick}
          >
            {isGenerating ? "생성 중..." : "생성하기"}
          </button>
        </GradientBox>
      </div>
    </article>
  );
};

export default TexttoVideo;
