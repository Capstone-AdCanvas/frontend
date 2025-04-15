import React, { useState } from "react";
import "./Step4.css";
import sampleImage from "../../../assets/두부_배경제거.png";
import GradientBox from "../../../components/GradientBox/GradientBox";

function Step4({ setCurrentStep, setHideStepBar }) {
  const [showFinalDownloadOnly, setShowFinalDownloadOnly] = useState(false);

  const handleNextStep = () => {
    setShowFinalDownloadOnly(true);
    setHideStepBar(true); // StepBar 숨기기
  };

  return (
    <div className="step4">
      {!showFinalDownloadOnly ? (
        <>
          <div className="step4__container">
            <div className="step4__left">
              <GradientBox width={"660px"} height={"700px"}>
                <div className="step4__content">
                  <div className="step4__image">
                    <img src={sampleImage} alt="Sample" />
                  </div>
                  <div className="step4__text-editor"></div>
                </div>
              </GradientBox>
            </div>

            <div className="step4__right">
              <GradientBox width={"480px"} height={"280px"}>
                <div className="text-input__box">
                  <div className="text-input__title">텍스트 입력</div>
                  <textarea
                    className="text-input__textarea"
                    placeholder="텍스트를 입력하세요"
                  />
                  <button className="text-input__button">추가하기</button>
                </div>
              </GradientBox>

              <GradientBox width={"480px"} height={"380px"}>
                <div className="font-combo__box">
                  <div className="font-combo__title">글꼴 조합</div>
                  <div className="font-combo__grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="font-combo__item" />
                    ))}
                  </div>
                </div>
              </GradientBox>
            </div>
          </div>

          <button className="next-step-button" onClick={handleNextStep}>
            &gt;
          </button>
        </>
      ) : (
        <div className="step4__download-only">
          <div className="step4-download-box fade-in">
            <img src={sampleImage} alt="Final" className="step4-final-image" />
            <div className="step4-download-info">
              <div className="step4-image-name">최종 이미지.jpg</div>
              <div className="step4-image-size">사이즈: 400 × 400</div>
              <button className="step4-download-button">다운로드</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Step4;
