// /Users/wonjin/Desktop/AdCanvas/frontend/src/pages/AiVideos/AiVideos.jsx

import React, { useState, useEffect } from "react";
import "./AiVideos.css";
import TexttoVideo from "../../components/TexttoVideo/TexttoVideo";
import ImagetoVideo from "../../components/ImagetoVideo/ImagetoVideo";
import GradientBox from "../../components/GradientBox/GradientBox";
import BackgroundMusic from "./components/BackgroundMusic/BackgroundMusic";
import ScriptEditor from "./components/ScriptEditor/ScriptEditor";
import VideoPreview from "./components/VideoPreview/VideoPreview";
import TextScriptEditor from "./components/TextScriptEditor/TextScriptEditor";
import { voiceList } from "./speechmodel";
import { previewTTS } from "../../api/tts";
import { mergeVideos } from "../../api/merge";
import { backgroundMusicList } from "./components/BackgroundMusic/BackgroundMusic";

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
  const [showTextScriptEditor, setShowTextScriptEditor] = useState(false);
  const [showTextScriptResult, setShowTextScriptResult] = useState(false);
  const [selectedTextVoiceIndex, setSelectedTextVoiceIndex] = useState(null);
  const [selectedTextMusic, setSelectedTextMusic] = useState(null);
  const [mergedVideoUrl, setMergedVideoUrl] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [previewAudioUrl, setPreviewAudioUrl] = useState(null);
  const [generatedScript, setGeneratedScript] = useState('');
  const [videoUrls, setVideoUrls] = useState([]);
  const [ttsUrls, setTtsUrls] = useState([]);

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

  const handleGenerate = (videoUrl) => {
    if (videoUrl) {
      console.log('Original video URL received:', videoUrl);
      
      // blob URL인 경우 원본 URL을 사용
      const originalVideoUrl = videoUrl.startsWith('blob:') 
        ? videoUrls[videoUrls.length - 1] // 마지막으로 저장된 원본 URL 사용
        : videoUrl;
      
      console.log('Processed video URL:', originalVideoUrl);
      setVideoUrls(prev => {
        const newUrls = [...prev, originalVideoUrl];
        console.log('Updated videoUrls array:', newUrls);
        return newUrls;
      });
      setMergedVideoUrl(videoUrl); // 미리보기용 blob URL
      setShowVideoText(true);
    }
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

  const handleScriptGenerate = (previewResponse) => {
    console.log('=== 스크립트 생성 응답 ===');
    console.log('전체 응답 데이터:', previewResponse);
    console.log('TTS 경로 목록:', previewResponse.ttsPaths);
    console.log('========================');

    setShowScriptResult(true);
    setPreviewAudioUrl(previewResponse.ttsPath);
    setTtsUrls(previewResponse.ttsPaths); // 모든 TTS 경로 저장

    console.log('=== TTS URL 상태 업데이트 ===');
    console.log('저장된 TTS URL 목록:', previewResponse.ttsPaths);
    console.log('==========================');
  };

  const handleVoiceSelect = (index) => {
    setSelectedVoiceIndex(index);
  };

  const handleMerge = async () => {
    setIsMerging(true);
    setShowMergedVideo(false);

    try {
      const selectedMusic = activeTab === "text" ? selectedTextMusic : selectedMusic;
      const tema = selectedMusic !== null ? backgroundMusicList[selectedMusic]?.id : null;

      console.log('=== 영상 통합 API 요청 데이터 ===');
      console.log('비디오 URL 목록:', videoUrls);
      console.log('선택된 배경음악:', tema);
      console.log('TTS URL 목록:', ttsUrls);
      console.log('===========================');

      if (!videoUrls || videoUrls.length === 0) {
        throw new Error('비디오 URL이 없습니다.');
      }

      // 모든 비디오 URL과 TTS URL 사용
      const mergedVideoUrl = await mergeVideos(videoUrls, tema, ttsUrls);
      console.log('Merge successful, new video URL:', mergedVideoUrl);
      
      setMergedVideoUrl(mergedVideoUrl);
      setIsMerging(false);
      setShowMergedVideo(true);
      setShowVideoText(false);
      setShowVideoImage(false);
    } catch (error) {
      console.error('Error merging videos:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        videoUrls,
        tema: selectedMusic !== null ? backgroundMusicList[selectedMusic]?.id : null,
        ttsUrls
      });
      setIsMerging(false);
    }
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

  const handleTextScriptGenerate = (response) => {
    setShowTextScriptResult(true);
    setPreviewAudioUrl(response.ttsPath);
    setGeneratedScript(response.text);
  };

  const handleTextVoiceSelect = async (index) => {
    setSelectedTextVoiceIndex(index);
    
    if (generatedScript) {
      try {
        const previewResponse = await previewTTS({
          speaker: voiceList[index].code,
          text: generatedScript,
          emotion: 1,
          emotionStrength: 2
        });
        setPreviewAudioUrl(previewResponse.ttsPath);
      } catch (error) {
        console.error('Error generating TTS preview:', error);
      }
    }
  };

  const handleTextMusicSelect = (musicId) => {
    setSelectedTextMusic(musicId);
  };

  const handleTextProceedToScript = () => {
    setShowBackgroundMusic(false);
    setShowTextScriptEditor(true);
  };

  const handleTextBackgroundMusicSelect = () => {
    setShowBackgroundMusic(true);
    setShowTextScriptEditor(false);
  };

  const handleStartScriptGeneration = () => {
    if (activeTab === "text") {
      setShowTextScriptEditor(true);
    } else {
      setShowScriptEditor(true);
    }
  };

  const handleTestScriptGeneration = () => {
    if (activeTab === "text") {
      setShowTextScriptEditor(true);
      setShowTextScriptResult(true);
    } else {
      setShowScriptEditor(true);
      setShowScriptResult(true);
    }
  };

  const handleVoicePlay = async (voiceIndex) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (generatedScript) {
      try {
        const previewResponse = await previewTTS({
          speaker: voiceList[voiceIndex].code,
          text: generatedScript,
          emotion: 1,
          emotionStrength: 2
        });

        const baseUrl = 'http://localhost:8080';
        const audioUrl = `${baseUrl}${previewResponse.ttsPath}`;
        
        const audio = new Audio();
        audio.src = audioUrl;
        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          console.error('Attempted to play:', audioUrl);
        };
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
          console.error('Attempted to play:', audioUrl);
        });
        setCurrentAudio(audio);
      } catch (error) {
        console.error('Error generating TTS preview:', error);
      }
    }
  };

  const shouldShowPreviewBox =
    isGenerating || showVideoText || showVideoImage || isMerging || showMergedVideo;

  return (
    <section className="AiVideo_aiVideos">
      <main className="AiVideo_aiVideos__initial">
        <div className={`AiVideo_aiVideos__editor ${showScriptEditor || showBackgroundMusic || showTextScriptEditor ? "no-margin" : ""}`}>
          {!showScriptEditor && !showBackgroundMusic && !showTextScriptEditor ? (
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
              <button className="AiVideo_test-button" onClick={handleTestScriptGeneration}>
                TTS 테스트하기
              </button>
              <button className="AiVideo_test-button" onClick={() => setShowBackgroundMusic(true)}>
                배경음악 테스트하기
              </button>
            </>
          ) : showBackgroundMusic ? (
            <GradientBox width={"550px"} height={"560px"}>
              <BackgroundMusic
                selectedMusic={activeTab === "text" ? selectedTextMusic : selectedMusic}
                onMusicSelect={activeTab === "text" ? handleTextMusicSelect : handleMusicSelect}
                onProceedToScript={activeTab === "text" ? handleTextProceedToScript : handleProceedToScript}
              />
            </GradientBox>
          ) : showScriptEditor ? (
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
                        {voiceList.map((voice, index) => (
                          <div
                            className={`AiVideo_voice-item ${selectedVoiceIndex === index ? "selected" : ""}`}
                            key={index}
                            onClick={() => handleVoiceSelect(index)}
                          >
                            <img src={voice.image} alt={voice.name} />
                            <div className="AiVideo_voice-info">
                              <div className="AiVideo_voice-name">{voice.name}</div>
                              <div className="AiVideo_voice-details">{voice.gender}</div>
                            </div>
                            <button 
                              className="AiVideo_voice-play" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVoicePlay(index);
                              }}
                            >
                              ▶
                            </button>
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
          ) : (
            <>
              <GradientBox width={"550px"} height={"240px"}>
                <TextScriptEditor
                  showScriptResult={showTextScriptResult}
                  selectedVoiceIndex={selectedTextVoiceIndex}
                  onScriptGenerate={handleTextScriptGenerate}
                  onVoiceSelect={handleTextVoiceSelect}
                  onMerge={handleMerge}
                  voiceList={voiceList}
                />
              </GradientBox>
              {showTextScriptResult && (
                <div className="AiVideo_script-output__wrapper">
                  <GradientBox width={"550px"} height={"450px"}>
                    <div className="AiVideo_script-output__box">
                      <div className="AiVideo_text-input__title">생성된 대본</div>
                      <div className="AiVideo_text-input__textarea" style={{ height: "138px", width: "101%" }}>
                        {generatedScript}
                      </div>
                      <div className="AiVideo_voice-list">
                        {voiceList.map((voice, index) => (
                          <div
                            className={`AiVideo_voice-item ${selectedTextVoiceIndex === index ? "selected" : ""}`}
                            key={index}
                            onClick={() => handleTextVoiceSelect(index)}
                          >
                            <img src={voice.image} alt={voice.name} />
                            <div className="AiVideo_voice-info">
                              <div className="AiVideo_voice-name">{voice.name}</div>
                              <div className="AiVideo_voice-details">{voice.gender}</div>
                            </div>
                            <button 
                              className="AiVideo_voice-play" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVoicePlay(index);
                              }}
                            >
                              ▶
                            </button>
                          </div>
                        ))}
                      </div>
                      {selectedTextVoiceIndex !== null && (
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
            mergedVideoUrl={mergedVideoUrl}
            onBackgroundMusicSelect={activeTab === "text" ? handleTextBackgroundMusicSelect : handleBackgroundMusicSelect}
          />
          {(showVideoText || showVideoImage) && !showScriptEditor && !showTextScriptEditor && (
            <button className="AiVideo_script-add-button" onClick={handleStartScriptGeneration}>
              대본 생성하기
            </button>
          )}
        </div>
      </main>
    </section>
  );
}

export default AiVideos;
