import React, { useState, useEffect, useContext } from "react";
import "./TexttoVideo.css";
import GradientBox from "../GradientBox/GradientBox";
import Prompt from "../subcomponents/Prompt/Prompt";
import Settings from "../subcomponents/Settings/Settings";
import { createTextToVideo, pollTextVideoStatus, saveVideo } from "../../api/video";
import { mergeVideos } from "../../api/merge";
import { ProfileContext } from "../../context/ProfileContext";

const TexttoVideo = ({ activeTab, setActiveTab, setIsReadyToGenerate, handleGenerate }) => {
  const { id } = useContext(ProfileContext);
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
        async (videoStatuses) => {
          console.log('모든 비디오가 생성되었습니다:', videoStatuses);
          try {
            // videoUrl만 추출
            const videoUrls = videoStatuses.map(status => status.videoUrl);
            console.log('합성할 비디오 URLs:', videoUrls);
            
            // 영상 합성 API 호출
            const mergedVideoUrl = await mergeVideos(videoUrls);
            console.log('영상 합성이 완료되었습니다:', mergedVideoUrl);

            // 첫 번째 비디오 URL을 저장용으로 사용
            const firstVideoUrl = videoUrls[0];
            console.log('저장할 첫 번째 비디오 URL:', firstVideoUrl);

            // 영상 저장
            if (id) {
              try {
                const savedVideo = await saveVideo(id, {
                  videoUrl: firstVideoUrl, // 첫 번째 비디오 URL 사용
                  aspectRatio: ratio,
                  duration: parseInt(videoLength.replace('s', '')),
                  createdAt: new Date().toISOString()
                });
                console.log('영상이 저장되었습니다:', savedVideo);
              } catch (saveError) {
                console.error('영상 저장 중 오류 발생:', saveError);
                // 저장 실패는 전체 프로세스를 중단시키지 않음
              }
            }
            
            // 상위 컴포넌트에 합성된 영상 URL 전달
            handleGenerate(mergedVideoUrl);
            setIsGenerating(false);
          } catch (mergeError) {
            console.error('영상 합성 중 오류 발생:', mergeError);
            setError(mergeError.message);
            setIsGenerating(false);
          }
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
