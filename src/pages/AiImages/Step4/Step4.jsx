import React, { useState, useEffect, useRef } from "react";
import "./Step4.css";
import GradientBox from "../../../components/GradientBox/GradientBox";
import { combineImage, setImageName } from "../../../api/image";
import ArialCombo from '../../../assets/font-combos/Arial_545454_25.png';
import CourierCombo from '../../../assets/font-combos/Courier_38b6ff_25.png';
import DialogCombo from '../../../assets/font-combos/Dialog_b49efe_25.png';
import MonospacedCombo from '../../../assets/font-combos/Monospaced_162144_25.png';
import SansSerifCombo from '../../../assets/font-combos/SansSerif_ffbd59_25.png';
import SerifCombo from '../../../assets/font-combos/Serif_00bf63_25.png';

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
  const [draggedText, setDraggedText] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageBox, setImageBox] = useState(null);
  const imageRef = useRef(null);
  const [imgNaturalSize, setImgNaturalSize] = useState({ width: 0, height: 0 });
  const [renderedSize, setRenderedSize] = useState({ width: 1, height: 1 });
  const [imageId, setImageId] = useState(null);
  const [downloadName, setDownloadName] = useState('최종 이미지');

  const fonts = ["Arial", "Courier", "Serif", "SansSerif", "Monospaced", "Dialog"];

  // 글꼴 조합 이미지 정보
  const fontCombos = [
    { file: ArialCombo, name: 'Arial_545454_25.png' },
    { file: CourierCombo, name: 'Courier_38b6ff_25.png' },
    { file: DialogCombo, name: 'Dialog_b49efe_25.png' },
    { file: MonospacedCombo, name: 'Monospaced_162144_25.png' },
    { file: SansSerifCombo, name: 'SansSerif_ffbd59_25.png' },
    { file: SerifCombo, name: 'Serif_00bf63_25.png' },
  ];

  useEffect(() => {
    if (selectedImage) {
      setCurrentImage(selectedImage);
      console.log('Step4 - 현재 이미지:', selectedImage);
    }
  }, [selectedImage]);

  // 이미지 영역의 bounding box 저장
  useEffect(() => {
    if (imageRef.current) {
      setImageBox(imageRef.current.getBoundingClientRect());
    }
  }, [showFinalDownloadOnly]);

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
      position: { x: 50, y: 50 }
    };
    
    setAddedTexts(prev => [...prev, newText]);
    setTextInput("");
  };

  const handleMouseDown = (e, textId) => {
    if (!imageBox) return;
    const text = addedTexts.find(t => t.id === textId);
    if (!text) return;

    setDraggedText(textId);
    setDragStart({
      x: e.clientX - imageBox.left - text.position.x,
      y: e.clientY - imageBox.top - text.position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedText || !imageBox) return;
    setAddedTexts(prev => prev.map(text => {
      if (text.id === draggedText) {
        return {
          ...text,
          position: {
            x: e.clientX - imageBox.left - dragStart.x,
            y: e.clientY - imageBox.top - dragStart.y
          }
        };
      }
      return text;
    }));
  };

  const handleMouseUp = () => {
    setDraggedText(null);
  };

  // 글꼴 조합 이미지 클릭 시 스타일 세팅
  const handleFontComboClick = (combo) => {
    // 파일명에서 정보 추출: Font_Color_Size.png
    const [font, color, sizeWithExt] = combo.name.replace('.png', '').split('_');
    setTextStyle({
      font,
      color: color.startsWith('#') ? color : `#${color}`,
      size: parseInt(sizeWithExt, 10)
    });
  };

  // hex -> rgb 변환 함수
  function hexToRgb(hex) {
    let c = hex.substring(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgb(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255})`;
  }

  // 이미지 로드 시 실제 크기 저장
  const imageOnLoad = (e) => {
    setImgNaturalSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
    // 렌더링된 크기도 저장
    setRenderedSize({
      width: e.target.offsetWidth,
      height: e.target.offsetHeight
    });
  };

  const handleNextStep = async () => {
    if (!currentImage) {
      alert('기본 이미지가 없습니다.');
      return;
    }

    try {
      const overlays = addedTexts.map(text => {
        // 화면 좌표 → 실제 이미지 좌표 변환
        const x = Math.round((text.position.x / renderedSize.width) * imgNaturalSize.width);
        const y = Math.round((text.position.y / renderedSize.height) * imgNaturalSize.height);
        return {
          type: 'text',
          x,
          y,
          text: text.content,
          font: text.style.font,
          size: text.style.size,
          color: text.style.color
        };
      });

      console.log('텍스트 합성 API 요청 데이터:', { baseImage: currentImage, overlays });

      const result = await combineImage(currentImage, overlays);
      console.log('텍스트 합성 API 응답:', result);

      setCurrentImage(result.finalImage); // 최종 합성 이미지를 다운로드 화면에 표시
      setImageId(result.id); // imageId 저장
      setShowFinalDownloadOnly(true);
      setHideStepBar(true);
    } catch (error) {
      console.error('텍스트 합성 실패:', error);
      alert('텍스트 합성에 실패했습니다.');
    }
  };

  // 다운로드 버튼 클릭 시: 이름 설정 API 호출만 수행
  const handleDownload = async () => {
    if (!currentImage || !imageId || !downloadName.trim()) return;
    try {
      await setImageName(imageId, downloadName);
      alert('이미지 이름이 저장되었습니다.');
    } catch (err) {
      alert(err.message || '이미지 이름 저장에 실패했습니다.');
    }
  };

  const isAddButtonActive = textInput.trim().length > 0;

  return (
    <div className="step4">
      {!showFinalDownloadOnly ? (
        <>
          <div className="step4__container">
            <div className="step4__left">
              <GradientBox width={"660px"} height={"700px"}>
                <div className="step4__content">
                  <div 
                    className="step4__image"
                    ref={imageRef}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {currentImage && <img src={currentImage} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onLoad={imageOnLoad} />}
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
                          cursor: 'move',
                          userSelect: 'none',
                          font: `${text.style.size}px ${text.style.font}`,
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale'
                        }}
                        onMouseDown={(e) => handleMouseDown(e, text.id)}
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
                          style={{ fontFamily: textStyle.font }}
                        >
                          {fonts.map(font => (
                            <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                          ))}
                        </select>
                      </div>
                      <div className="style-control">
                        <label>색상</label>
                        <input 
                          type="color" 
                          value={textStyle.color}
                          onChange={(e) => handleStyleChange('color', e.target.value)}
                        />
                        <span style={{
                          color: textStyle.color,
                          backgroundColor: hexToRgb(textStyle.color),
                          borderRadius: '50%',
                          display: 'inline-block',
                          width: 20,
                          height: 20,
                          marginLeft: 8,
                          verticalAlign: 'middle'
                        }}>●</span>
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
                      className={`text-input__button${isAddButtonActive ? ' active' : ''}`}
                      onClick={handleAddText}
                      disabled={!isAddButtonActive}
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
                    {fontCombos.map((combo, i) => (
                      <div key={i} className="font-combo__item" onClick={() => handleFontComboClick(combo)} style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}>
                        <img src={combo.file} alt={combo.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
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
              <input
                className="step4-image-name"
                value={downloadName}
                onChange={e => setDownloadName(e.target.value)}
                placeholder="이미지 이름을 입력하세요"
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, width: 300, border: 'none', background: 'transparent', color: 'white', outline: 'none', textAlign: 'center' }}
              />
              <div className="step4-image-size">사이즈: 400 × 400</div>
              <button className="step4-download-button" onClick={handleDownload} disabled={!downloadName.trim()}>다운로드</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Step4;
