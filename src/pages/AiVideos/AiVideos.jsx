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
  const [showTtsTest, setShowTtsTest] = useState(false);
  const [isExhibitionMode, setIsExhibitionMode] = useState(false);
  const [isImageExhibitionMode, setIsImageExhibitionMode] = useState(false);

  // 전시용 영상 경로 분리
  const exhibitionTextVideoUrl = 'http://localhost:8080/videos/water_silence.mp4';
  const exhibitionImageVideoUrl = 'http://localhost:8080/videos/toriden_silence.mp4';

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

  const handleScriptGenerate = (previewResponse) => {
    if (!previewResponse) {
      console.error('Invalid preview response');
      return;
    }

    console.log('=== 스크립트 생성 응답 (AiVideos) ===');
    console.log('전체 응답 데이터:', previewResponse);
    console.log('응답 타입:', typeof previewResponse);
    console.log('배열 여부:', Array.isArray(previewResponse));
    console.log('========================');
    
    // TTS 경로 추출
    let ttsPaths = [];
    if (previewResponse.ttsPaths) {
      ttsPaths = previewResponse.ttsPaths;
    } else if (Array.isArray(previewResponse)) {
      ttsPaths = previewResponse.map(item => item.ttsPath);
    } else if (previewResponse.ttsPath) {
      ttsPaths = [previewResponse.ttsPath];
    }
    
    console.log('추출된 TTS 경로 목록:', ttsPaths);
    console.log('========================');

    setShowScriptResult(true);
    setPreviewAudioUrl(previewResponse.ttsPath);
    
    // TTS 경로가 있는 경우에만 저장
    if (ttsPaths.length > 0) {
      console.log('TTS 경로 저장:', ttsPaths);
      setTtsUrls(ttsPaths);
    }

    console.log('=== TTS URL 상태 업데이트 ===');
    console.log('저장된 TTS 경로 목록:', ttsPaths);
    console.log('==========================');
  };

  const handleGenerate = (videoUrl) => {
    if (!videoUrl) {
      console.error('Invalid video URL received');
      return;
    }

    // 상태 초기화
    setShowVideoText(false);
    setShowVideoImage(false);
    setShowMergedVideo(false);
    setMergedVideoUrl(null);

    console.log('=== 비디오 URL 처리 시작 ===');
    console.log('받은 videoUrl:', videoUrl);
    
    // videoUrl이 배열인 경우 (원본 URL들)
    if (Array.isArray(videoUrl)) {
      console.log('원본 비디오 URL들:', videoUrl);
      setVideoUrls(videoUrl); // 원본 URL들 저장
      
      // 모든 URL을 사용하여 영상 합성
      const params = new URLSearchParams();
      videoUrl.forEach(url => params.append('videoUrls', url));
      console.log('=== 영상 합성 API 요청 데이터 상세 (image to video) ===');
      console.log('videoUrls 배열:', videoUrl);
      console.log('videoUrls 배열 길이:', videoUrl.length);
      console.log('videoUrls 배열 타입:', typeof videoUrl);
      console.log('videoUrls 배열 내용:', JSON.stringify(videoUrl, null, 2));
      console.log('전체 파라미터:', params.toString());
      console.log('===========================');
      
      // 영상 합성 API 호출
      mergeVideos(videoUrl, null, []).then(mergedUrl => {
        console.log('초기 영상 합성 완료 (image to video):', mergedUrl);
        setMergedVideoUrl(mergedUrl);
      }).catch(error => {
        console.error('초기 영상 합성 실패 (image to video):', error);
      });
    } 
    // videoUrl이 문자열인 경우 (blob URL)
    else {
      console.log('Blob URL:', videoUrl);
      setMergedVideoUrl(videoUrl); // 미리보기용 blob URL 저장
    }
    
    // activeTab에 따라 미리보기 상태를 다르게 설정
    if (activeTab === 'text') {
      setShowVideoText(true);
      setShowVideoImage(false);
    } else if (activeTab === 'image') {
      setShowVideoImage(true);
      setShowVideoText(false);
    }
    console.log('=== 비디오 URL 처리 완료 ===');
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

  const handleVoiceSelect = (index) => {
    setSelectedVoiceIndex(index);
  };

  const handleExhibitionButtonClick = () => {
    setIsExhibitionMode(true);
    setVideoUrls([exhibitionTextVideoUrl]);
    setMergedVideoUrl(exhibitionTextVideoUrl);
    setShowVideoText(true);
    setShowVideoImage(false);
    setShowMergedVideo(false);
  };

  const handleImageExhibitionButtonClick = () => {
    setIsImageExhibitionMode(true);
    setVideoUrls([exhibitionImageVideoUrl]);
    setMergedVideoUrl(exhibitionImageVideoUrl);
    setShowVideoImage(true);
    setShowVideoText(false);
    setShowMergedVideo(false);
  };

  const handleMerge = async (currentTtsUrls = ttsUrls) => {
    setIsMerging(true);
    setShowMergedVideo(false);

    try {
      let validVideoUrls;
      let tema;
      if (activeTab === 'image' && isImageExhibitionMode) {
        validVideoUrls = [exhibitionImageVideoUrl];
        const musicIndex = selectedMusic;
        tema = musicIndex !== null ? backgroundMusicList[musicIndex]?.id : null;
        const mergedUrl = await mergeVideos(validVideoUrls, tema, []);
        setMergedVideoUrl(mergedUrl);
        setIsMerging(false);
        setShowMergedVideo(true);
        setShowVideoText(false);
        setShowVideoImage(false);
        setIsImageExhibitionMode(false);
        return;
      } else if (activeTab === 'image' || isExhibitionMode) {
        validVideoUrls = [exhibitionTextVideoUrl];
        const musicIndex = activeTab === 'text' ? selectedTextMusic : selectedMusic;
        tema = musicIndex !== null ? backgroundMusicList[musicIndex]?.id : null;
        const mergedUrl = await mergeVideos(validVideoUrls, tema, currentTtsUrls);
        setMergedVideoUrl(mergedUrl);
        setIsMerging(false);
        setShowMergedVideo(true);
        setShowVideoText(false);
        setShowVideoImage(false);
        setIsExhibitionMode(false);
        return;
      } else {
        const selectedMusic = activeTab === "text" ? selectedTextMusic : selectedMusic;
        tema = selectedMusic !== null ? backgroundMusicList[selectedMusic]?.id : null;
        validVideoUrls = videoUrls.filter(url => url && !url.startsWith('blob:'));
      }
      // 기존 플로우
      const params = new URLSearchParams();
      validVideoUrls.forEach(url => params.append('videoUrls', url));
      if (tema) params.append('tema', tema);
      currentTtsUrls.forEach(url => params.append('ttsUrls', url));
      const mergedVideoUrl = await mergeVideos(validVideoUrls, tema, currentTtsUrls);
      setMergedVideoUrl(mergedVideoUrl);
      setIsMerging(false);
      setShowMergedVideo(true);
      setShowVideoText(false);
      setShowVideoImage(false);
    } catch (error) {
      console.error('Error merging videos:', error);
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
    // image to video 탭에서는 배경음악 확정 시 바로 영상 합성
    if (activeTab === 'image') {
      handleMerge([]); // ttsUrls는 빈 배열로 전달
      setShowBackgroundMusic(false);
    } else {
      setShowBackgroundMusic(false);
      setShowScriptEditor(true);
    }
  };

  const handleTextScriptGenerate = (response) => {
    setShowTextScriptResult(true);
    setPreviewAudioUrl(response.ttsPath);
    setGeneratedScript(response.text);
    
    // TTS 경로 처리 추가
    if (response.ttsPaths && response.ttsPaths.length > 0) {
      console.log('=== TTS 경로 저장 (handleTextScriptGenerate) ===');
      console.log('TTS 경로 목록:', response.ttsPaths);
      setTtsUrls(response.ttsPaths);
    }
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
      setShowBackgroundMusic(true);
      setShowScriptEditor(false);
      setShowTextScriptEditor(false);
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

  const handleMusicTest = () => {
    setShowBackgroundMusic(true);
    setShowScriptEditor(false);
    setShowTextScriptEditor(false);
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
                onExhibitionButtonClick={handleExhibitionButtonClick}
              />
              <ImagetoVideo
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                setIsReadyToGenerate={setIsReadyToGenerate}
                handleGenerate={handleGenerate}
                onExhibitionButtonClick={handleImageExhibitionButtonClick}
              />
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
                        <button className="AiVideo_merge-button" onClick={() => handleMerge()}>
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
                        <button className="AiVideo_merge-button" onClick={() => handleMerge()}>
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
