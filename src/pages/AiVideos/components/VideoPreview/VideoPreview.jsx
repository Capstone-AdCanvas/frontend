import React from 'react';
import './VideoPreview.css';
import needPrompt from "../../../../assets/needPrompt.png";
import dummyVideo from "../../../../assets/dummyvideo.mp4";

function VideoPreview({ 
  shouldShowPreviewBox,
  isGenerating,
  isMerging,
  showVideoText,
  showVideoImage,
  showMergedVideo,
  onBackgroundMusicSelect,
  activeTab
}) {
  if (!shouldShowPreviewBox) {
    return (
      <div className="AiVideo_preview__initial">
        <img src={needPrompt} alt="프롬프트 필요" />
        <p>프롬프트를 입력해주세요</p>
      </div>
    );
  }

  return (
    <div className="AiVideo_aiVideos__preview">
      {!shouldShowPreviewBox ? (
        <div className="AiVideo_preview__initial">
          <img src="/images/video-icon.png" alt="video" />
          <p>영상을 생성해주세요</p>
        </div>
      ) : isGenerating ? (
        <div className="AiVideo_preview__loading">
          <div className="AiVideo_spinner"></div>
        </div>
      ) : isMerging ? (
        <div className="AiVideo_preview__loading">
          <div className="AiVideo_spinner"></div>
        </div>
      ) : showVideoText ? (
        <div className="AiVideo_preview__videoBox">
          <video width="940" height="600" controls>
            <source src={dummyVideo} type="video/mp4" />
          </video>
          <button className="AiVideo_script-add-button" onClick={onBackgroundMusicSelect}>
            대본 만들기
          </button>
        </div>
      ) : showVideoImage ? (
        <div className="AiVideo_preview__videoBox">
          <video width="940" height="600" controls>
            <source src={dummyVideo} type="video/mp4" />
          </video>
          <button className="AiVideo_script-add-button" onClick={onBackgroundMusicSelect}>
            대본 만들기
          </button>
        </div>
      ) : showMergedVideo ? (
        <div className="AiVideo_preview__videoBox">
          <video width="940" height="600" controls>
            <source src={dummyVideo} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
}

export default VideoPreview; 