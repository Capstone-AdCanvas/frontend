// /Users/wonjin/Desktop/AdCanvas/frontend/src/pages/AiVideos/AiVideos.jsx

import React, { useState, useEffect } from "react";
import "./AiVideos.css";
import TexttoVideo from "../../components/TexttoVideo/TexttoVideo";
import ImagetoVideo from "../../components/ImagetoVideo/ImagetoVideo";
import GradientBox from "../../components/GradientBox/GradientBox";
import BackgroundMusic from "./components/BackgroundMusic/BackgroundMusic";
import ScriptEditor from "./components/ScriptEditor/ScriptEditor";
import VideoPreview from "./components/VideoPreview/VideoPreview";

function AiVideos() {
  const [activeTab, setActiveTab] = useState("text");
  const [isReadyToGenerate, setIsReadyToGenerate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideoText, setShowVideoText] = useState(false);
  const [showVideoImage, setShowVideoImage] = useState(false);
  const [showScriptEditor, setShowScriptEditor] = useState(false);
  const [showScriptResult, setShowScriptResult] = useState(false);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(null);
  const [isMerging, setIsMerging] = useState(false);
  const [showMergedVideo, setShowMergedVideo] = useState(false);
  const [showBackgroundMusic, setShowBackgroundMusic] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        if (activeTab === "text") setShowVideoText(true);
        else setShowVideoImage(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isGenerating]);

  useEffect(() => {
    if (isMerging) {
      const timer = setTimeout(() => {
        setIsMerging(false);
        setShowMergedVideo(true);
        setShowVideoText(false);
        setShowVideoImage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMerging]);

  const handleGenerate = () => {
    if (!isReadyToGenerate) return;
    setIsGenerating(true);
    setShowVideoText(false);
    setShowVideoImage(false);
    setShowMergedVideo(false);
    setShowScriptEditor(false);
    setShowScriptResult(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsGenerating(false);
    setShowVideoText(false);
    setShowVideoImage(false);
    setShowMergedVideo(false);
    setShowScriptEditor(false);
    setShowScriptResult(false);
  };

  const handleScriptGenerate = () => {
    setShowScriptResult(true);
  };

  const handleVoiceSelect = (index) => {
    setSelectedVoiceIndex(index);
  };

  const handleMerge = () => {
    setIsMerging(true);
    setShowMergedVideo(false);
  };

  const handleBackgroundMusicSelect = () => {
    setShowBackgroundMusic(true);
    setShowScriptEditor(false);
  };

  const handleMusicSelect = (musicId) => {
    setSelectedMusic(musicId);
  };

  const handleProceedToScript = () => {
    setShowBackgroundMusic(false);
    setShowScriptEditor(true);
  };

  const shouldShowPreviewBox =
    isGenerating || showVideoText || showVideoImage || isMerging || showMergedVideo;

  return (
    <section className="AiVideo_aiVideos">
      <main className="AiVideo_aiVideos__initial">
        <div className={`AiVideo_aiVideos__editor ${showScriptEditor || showBackgroundMusic ? "no-margin" : ""}`}>
          {!showScriptEditor && !showBackgroundMusic ? (
            <>
              <TexttoVideo
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                setIsReadyToGenerate={setIsReadyToGenerate}
                handleGenerate={handleGenerate}
              />
              <ImagetoVideo
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                setIsReadyToGenerate={setIsReadyToGenerate}
                handleGenerate={handleGenerate}
              />
            </>
          ) : showBackgroundMusic ? (
            <GradientBox width={"550px"} height={"550px"}>
              <BackgroundMusic
                selectedMusic={selectedMusic}
                onMusicSelect={handleMusicSelect}
                onProceedToScript={handleProceedToScript}
              />
            </GradientBox>
          ) : (
            <>
              <GradientBox width={"550px"} height={"240px"}>
                <ScriptEditor
                  showScriptResult={showScriptResult}
                  selectedVoiceIndex={selectedVoiceIndex}
                  onScriptGenerate={handleScriptGenerate}
                  onVoiceSelect={handleVoiceSelect}
                  onMerge={handleMerge}
                />
              </GradientBox>
              {showScriptResult && (
                <div className="AiVideo_script-output__wrapper">
                  <GradientBox width={"550px"} height={"450px"}>
                    <div className="AiVideo_script-output__box">
                      <div className="AiVideo_text-input__title">생성된 대본</div>
                      <div className="AiVideo_text-input__textarea" style={{ height: "138px", width: "101%" }}>
                        지친 순간, 내 몸이 먼저 찾는건<br />
                        맑고 깨끗한 한 모금, 생기를 채우다. <br />
                        Deep 워터, 당신의 하루를 깨우는 물.
                      </div>
                      <div className="AiVideo_voice-list">
                        {[...Array(6)].map((_, index) => (
                          <div
                            className={`AiVideo_voice-item ${selectedVoiceIndex === index ? "selected" : ""}`}
                            key={index}
                            onClick={() => handleVoiceSelect(index)}
                          >
                            <img src="https://placehold.co/45x45" alt="voice" />
                            <div className="AiVideo_voice-info">
                              <div className="AiVideo_voice-name">Voice {index + 1}</div>
                              <div className="AiVideo_voice-details">30세 - 남성(KR)</div>
                            </div>
                            <button className="AiVideo_voice-play">▶</button>
                          </div>
                        ))}
                      </div>
                      {selectedVoiceIndex !== null && (
                        <button className="AiVideo_merge-button" onClick={handleMerge}>
                          음성 입히기
                        </button>
                      )}
                    </div>
                  </GradientBox>
                </div>
              )}
            </>
          )}
        </div>

        <div className="AiVideo_aiVideos__right">
          <VideoPreview
            shouldShowPreviewBox={shouldShowPreviewBox}
            isGenerating={isGenerating}
            isMerging={isMerging}
            showVideoText={showVideoText}
            showVideoImage={showVideoImage}
            showMergedVideo={showMergedVideo}
            onBackgroundMusicSelect={handleBackgroundMusicSelect}
          />
        </div>
      </main>
    </section>
  );
}

export default AiVideos;
