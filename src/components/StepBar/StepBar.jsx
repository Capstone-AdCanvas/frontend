import React from 'react';
import './StepBar.css';

function StepBar({ currentStep = 1 }) {
  return (
    <div className="stepbar">
      <div className="stepbar__labels">
        <div className="stepbar__label">
          <div className="stepbar__step">Step 1</div>
          <div className="stepbar__content">배경제거</div>
        </div>
        <div className="stepbar__label">
          <div className="stepbar__step">Step 2</div>
          <div className="stepbar__content">배경 생성</div>
        </div>
        <div className="stepbar__label">
          <div className="stepbar__step">Step 3</div>
          <div className="stepbar__content">로고 부착</div>
        </div>
        <div className="stepbar__label">
          <div className="stepbar__step">Step 4</div>
          <div className="stepbar__content">텍스트 합성</div>
        </div>
      </div>
      <div className="stepbar__container">
        <div className="stepbar__main"></div>
        <div
          className="stepbar__indicator"
          style={{ left: `${(currentStep - 1) * 300}px` }}
        ></div>
      </div>
    </div>
  );
}

export default StepBar;
