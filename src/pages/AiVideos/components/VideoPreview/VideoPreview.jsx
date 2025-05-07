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
  onBackgroundMusicSelect
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
      {(isGenerating || isMerging) && (
        <div className="AiVideo_preview__loading">
          <div className="AiVideo_spinner" />
        </div>
      )}
      {showVideoText && !isMerging && (
        <div className="AiVideo_preview__videoBox">
          <video width="940" height="600" controls>
            <source src={dummyVideo} type="video/mp4" />
          </video>
        </div>
      )}
      {showVideoImage && !isMerging && (
        <div className="AiVideo_preview__videoBox">
          <video width="940" height="600" controls>
            <source src={dummyVideo} type="video/mp4" />
          </video>
          <button
            className="AiVideo_script-add-button"
            onClick={onBackgroundMusicSelect}
          >
            배경음악 생성, 대본 만들고 음성 입히기
          </button>
        </div>
      )}
      {showMergedVideo && (
        <div className="AiVideo_preview__videoBox">
          <video width="940" height="600" controls>
            <source src={dummyVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoPreview; 