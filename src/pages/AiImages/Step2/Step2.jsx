import React, { useState } from "react";
import "./Step2.css";
import sampleImage from "../../../assets/두부_배경제거.png";
import regenerateIcon from "../../../assets/regenerate.png";

function Step2({ setCurrentStep }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showNextStepButton, setShowNextStepButton] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsGenerated(false);
    setSelectedImage(null);
    setShowNextStepButton(false);

    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 5000);
  };

  const handleRegenerate = () => {
    setIsGenerated(false);
    handleGenerate();
  };

  const handleSelectImage = (img) => {
    setSelectedImage(img);
  };

  const handleChoose = () => {
    setShowNextStepButton(true);
  };

  const handleNextStep = () => {
    setCurrentStep(3);
  };

  return (
    <div className="step2">
      <div className={`step2__container ${isGenerated ? "generated" : ""}`}>
        {!isGenerating && !isGenerated && (
          <>
            <div className="step2__top">
              <div className="step2__image">
                <img src={sampleImage} alt="Sample" />
              </div>
              <div className="prompt__container">
                <div className="prompt__inner">
                  <div className="prompt__title">Prompt</div>
                  <div className="prompt__divider" />
                  <textarea
                    className="prompt__textarea"
                    placeholder="ex) 바다에서 뛰어노는 배경으로 해줘"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="step2__bottom">
              <div className="Theme__container">
                <div className="theme__inner">
                  <div className="theme__title">Theme</div>
                  <div className="theme__divider" />
                  <div className="theme__box-group">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className="theme__box"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="generate__button" onClick={handleGenerate}>
              Generate
            </button>
          </>
        )}

        {isGenerating && (
          <div className="loading__indicator">
            <div className="loader"></div>
          </div>
        )}

        {isGenerated && (
          <div className="result__section">
            <div className="result__left">
              <div className="result__grid">
                {[1, 2, 3, 4].map((_, i) => (
                  <img
                    key={i}
                    src={sampleImage}
                    alt={`Generated ${i}`}
                    className="generated__image"
                    onClick={() => handleSelectImage(sampleImage)}
                  />
                ))}
              </div>
              <button className="regenerate__button-fixed" onClick={handleRegenerate}>
                <img src={regenerateIcon} alt="Regenerate" />
              </button>
            </div>

            <div className="result__right">
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="selected__image"
                  />
                  <div className="action__buttons">
                    <div className="button-row">
                      <button className="download__button">다운로드</button>
                    </div>
                    <div className="button-row">
                      <button className="choose__button" onClick={handleChoose}>선택</button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no__image">이미지를 선택해주세요</div>
              )}
            </div>
          </div>
        )}
        {showNextStepButton && (
          <button className="next-step-button" onClick={handleNextStep}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default Step2;
