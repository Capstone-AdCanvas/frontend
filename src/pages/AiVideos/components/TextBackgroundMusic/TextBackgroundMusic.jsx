import React from 'react';
import './TextBackgroundMusic.css';

function TextBackgroundMusic({ selectedMusic, onMusicSelect, onProceedToScript }) {
  return (
    <div className="TextBackgroundMusic">
      <div className="TextBackgroundMusic__title">배경 음악 선택</div>
      <div className="TextBackgroundMusic__list">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`TextBackgroundMusic__item ${selectedMusic === index ? 'selected' : ''}`}
            onClick={() => onMusicSelect(index)}
          >
            <img src="https://placehold.co/45x45" alt="music" />
            <div className="TextBackgroundMusic__info">
              <div className="TextBackgroundMusic__name">Music {index + 1}</div>
              <div className="TextBackgroundMusic__details">Upbeat - 120 BPM</div>
            </div>
            <button className="TextBackgroundMusic__play">▶</button>
          </div>
        ))}
      </div>
      <button className="TextBackgroundMusic__button" onClick={onProceedToScript}>
        다음
      </button>
    </div>
  );
}

export default TextBackgroundMusic; 