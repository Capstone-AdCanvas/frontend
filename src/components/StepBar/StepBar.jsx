import React from 'react';
import './StepBar.css';

function StepBar({ currentStep = 1 }) {
  const stepsData = [
    { step: "Step 1", content: "배경제거" },
    { step: "Step 2", content: "배경 생성" },
    { step: "Step 3", content: "로고 부착" },
    { step: "Step 4", content: "텍스트 합성" },
  ];
  
  return (
    <div className="stepbar">
      <div className="stepbar__labels">
        {stepsData.map((data, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          return (
            <div
              key={index}
              className="stepbar__label"
              style={{ opacity: isCompleted ? 0.3 : 1 }}
            >
              <div className="stepbar__step">{data.step}</div>
              <div className="stepbar__content">{data.content}</div>
            </div>
          );
        })}
      </div>
      <div className="stepbar__container">
        <div className="stepbar__main"></div>
        <div
          className="stepbar__indicator"
          style={{ left: `${(currentStep - 1) * 300}px` }}
        ></div>
        {/* 완료된 각 단계마다 체크 동그라미 (각 영역 중앙 계산: i*300 + (300/2) - (20/2)) */}
        {Array.from({ length: currentStep - 1 }, (_, i) => (
          <div
            key={i}
            className="stepbar__check"
            style={{ left: `${i * 300 + 150 - 10}px` }}
          >
            ✓
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepBar;
