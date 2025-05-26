import React, { useState, useEffect } from "react";
import "./Step4.css";
import GradientBox from "../../../components/GradientBox/GradientBox";

function Step4({ setCurrentStep, setHideStepBar, selectedImage }) {
  const [showFinalDownloadOnly, setShowFinalDownloadOnly] = useState(false);
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const [textInput, setTextInput] = useState("");
  const [textStyle, setTextStyle] = useState({
    font: "Arial",
    color: "#000000",
    size: 24
  });
  const [addedTexts, setAddedTexts] = useState([]);

  useEffect(() => {
    if (selectedImage) {
      setCurrentImage(selectedImage);
      console.log('Step4 - 현재 이미지:', selectedImage);
    }
  }, [selectedImage]);

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleStyleChange = (property, value) => {
    setTextStyle(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const handleAddText = () => {
    if (!textInput.trim()) return;
    
    const newText = {
      id: Date.now(),
      content: textInput,
      style: { ...textStyle },
      position: { x: 50, y: 50 } // 기본 위치
    };
    
    setAddedTexts(prev => [...prev, newText]);
    setTextInput("");
  };

  const handleNextStep = () => {
    setShowFinalDownloadOnly(true);
    setHideStepBar(true);
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
                    {currentImage && <img src={currentImage} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                    {addedTexts.map(text => (
                      <div
                        key={text.id}
                        style={{
                          position: 'absolute',
                          left: text.position.x,
                          top: text.position.y,
                          fontFamily: text.style.font,
                          color: text.style.color,
                          fontSize: `${text.style.size}px`,
                          cursor: 'move'
                        }}
                      >
                        {text.content}
                      </div>
                    ))}
                  </div>
                </div>
              </GradientBox>
            </div>

            <div className="step4__right">
              <GradientBox width={"480px"} height={"280px"}>
                <div className="text-input__box">
                  <div className="text-input__title">텍스트 입력</div>
                  <div className="text-input__controls">
                    <textarea
                      className="text-input__textarea"
                      placeholder="텍스트를 입력하세요"
                      value={textInput}
                      onChange={handleTextChange}
                    />
                    <div className="text-style__controls">
                      <div className="style-control">
                        <label>글꼴</label>
                        <select 
                          value={textStyle.font}
                          onChange={(e) => handleStyleChange('font', e.target.value)}
                        >
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Georgia">Georgia</option>
                        </select>
                      </div>
                      <div className="style-control">
                        <label>색상</label>
                        <input 
                          type="color" 
                          value={textStyle.color}
                          onChange={(e) => handleStyleChange('color', e.target.value)}
                        />
                      </div>
                      <div className="style-control">
                        <label>크기</label>
                        <input 
                          type="range"
                          min="12"
                          max="72"
                          value={textStyle.size}
                          onChange={(e) => handleStyleChange('size', parseInt(e.target.value))}
                        />
                        <span>{textStyle.size}px</span>
                      </div>
                    </div>
                    <button 
                      className="text-input__button"
                      onClick={handleAddText}
                    >
                      추가하기
                    </button>
                  </div>
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
            {currentImage && <img src={currentImage} alt="Final" className="step4-final-image" />}
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
