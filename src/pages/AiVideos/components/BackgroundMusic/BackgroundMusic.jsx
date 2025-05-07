import React from 'react';
import './BackgroundMusic.css';

function BackgroundMusic({ selectedMusic, onMusicSelect, onProceedToScript }) {
  return (
    <div className="AiVideo_background-music__container">
      <div className="AiVideo_background-music__header">
        <div className="header-item">앨범</div>
        <div className="header-item">재생</div>
        <div className="header-item">제목</div>
        <div className="header-item">소리 파형</div>
        <div className="header-item">정보</div>
      </div>
      <div className="AiVideo_background-music__list">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
            className={`music-item ${selectedMusic === index ? 'selected' : ''}`}
            onClick={() => onMusicSelect(index)}
          >
            <div className="music-album">
              <img src="https://placehold.co/60x60" alt="album" />
            </div>
            <div className="music-play">
              <button>▶</button>
            </div>
            <div className="music-title">배경음악 {index + 1}</div>
            <div className="music-waveform">
              <div className="waveform-visualization">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="wave-bar" style={{ height: `${Math.random() * 30 + 10}px` }} />
                ))}
              </div>
            </div>
            <div className="music-info">
              <span>3:30</span>
              <span>128kbps</span>
            </div>
          </div>
        ))}
      </div>
      {selectedMusic !== null && (
        <button 
          className="AiVideo_merge-button"
          onClick={onProceedToScript}
        >
          배경음악 확정
        </button>
      )}
    </div>
  );
}

export default BackgroundMusic; 