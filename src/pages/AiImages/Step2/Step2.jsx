import React, { useRef, useState } from "react";
import "./Step2.css";
import regenerateIcon from "../../../assets/regenerate.png";
import {
  generateBackground,
  generateCustomBackground,
  selectFinalImage,
} from "../../../api/image";
import AutoImage from "../../../assets/aiimage-step2-auto.png";
import StudioImage from "../../../assets/aiimage-step2-studio.png";
import OfficeImage from "../../../assets/aiimage-step2-office.png";
import CityImage from "../../../assets/aiimage-step2-city.png";
import SpringImage from "../../../assets/aiimage-step2-spring.png";
import SummerImage from "../../../assets/aiimage-step2-summer.png";
import FallImage from "../../../assets/aiimage-step2-fall.png";
import WinterImage from "../../../assets/aiimage-step2-winter.png";
import SimpleImage from "../../../assets/aiimage-step2-simple.png";
import WithplantImage from "../../../assets/aiimage-step2-withplant.png";
import TableImage from "../../../assets/aiimage-step2-table.png";
import MinialismImage from "../../../assets/aiimage-step2-minialism.png";

function Step2({ setCurrentStep, bgRemovedImage }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showNextStepButton, setShowNextStepButton] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);

  const themes = [
    { name: "AUTO", image: AutoImage },
    { name: "STUDIO", image: StudioImage },
    { name: "OFFICE", image: OfficeImage },
    { name: "CITY", image: CityImage },
    { name: "SPRING", image: SpringImage },
    { name: "SUMMER", image: SummerImage },
    { name: "FALL", image: FallImage },
    { name: "WINTER", image: WinterImage },
    { name: "SIMPLE", image: SimpleImage },
    { name: "WITH_PLANT", image: WithplantImage },
    { name: "TABLE", image: TableImage },
    { name: "MINIMALISM", image: MinialismImage },
  ];

  const themeScrollRef = useRef(null);

  // localhost로만 이미지 URL 생성
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:8080${path}`;
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setIsCustomPrompt(false);
    setCustomPrompt("");
  };

  const handlePromptChange = (e) => {
    setCustomPrompt(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsCustomPrompt(true);
      setSelectedTheme(null);
    } else {
      setIsCustomPrompt(false);
    }
  };

  const handleGenerate = async () => {
    if (!bgRemovedImage) return;

    setIsGenerating(true);
    setIsGenerated(false);
    setSelectedImage(null);
    setShowNextStepButton(false);

    try {
      // Extract image ID from the URL
      const imageId = bgRemovedImage
        .split("/")
        .pop()
        .replace("processed_", "")
        .replace(".png", "");

      let result;
      if (isCustomPrompt && customPrompt.trim() !== "") {
        result = await generateCustomBackground(imageId, customPrompt);
      } else if (selectedTheme) {
        // Convert theme to lowercase before sending to API
        const themeValue = selectedTheme.toLowerCase();
        result = await generateBackground(imageId, themeValue);
      } else {
        throw new Error("Please select a theme or enter a prompt");
      }

      // Check if result is an array and has items
      if (Array.isArray(result) && result.length > 0) {
        setGeneratedImages(result);
      } else {
        throw new Error("No images were generated");
      }

      setIsGenerating(false);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating images:", error);
      setIsGenerating(false);
      setGeneratedImages([]); // Reset generated images on error
    }
  };

  const handleRegenerate = () => {
    setIsGenerated(false);
    handleGenerate();
  };

  const handleSelectImage = (img) => {
    setSelectedImage(getImageUrl(img.tempImage ? img.tempImage : img));
  };

  // 최종 배경이미지 선택 API 호출
  const handleChoose = async () => {
    if (!selectedImage) return;
    // 전체 GCS URL 사용
    const fileName = selectedImage;
    console.log("최종 선택 fileName:", fileName);
    // 배경제거된 이미지의 id 추출
    const imageId = bgRemovedImage
      .split("/")
      .pop()
      .replace("processed_", "")
      .replace(".png", "");
    try {
      await selectFinalImage(imageId, fileName);
      setShowNextStepButton(true);
    } catch (error) {
      alert(error.message || "최종 이미지 선택에 실패했습니다.");
    }
  };

  const handleNextStep = () => {
    setCurrentStep(3);
  };

  const scrollTheme = (direction) => {
    if (themeScrollRef.current) {
      const scrollAmount = 200; // 스크롤 이동 거리
      themeScrollRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="step2">
      <div className={`step2__container ${isGenerated ? "generated" : ""}`}>
        {!isGenerating && !isGenerated && (
          <>
            <div className="step2__top">
              <div className="step2__image">
                <img src={bgRemovedImage} alt="Background Removed" />
              </div>
              <div className="prompt__container">
                <div className="prompt__inner">
                  <div className="prompt__title">Prompt</div>
                  <div className="prompt__divider" />
                  <textarea
                    className="prompt__textarea"
                    placeholder={
                      selectedTheme
                        ? "Theme selected. Enter prompt to use custom generation."
                        : "Enter your custom prompt"
                    }
                    value={customPrompt}
                    onChange={handlePromptChange}
                    disabled={selectedTheme !== null}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="step2__bottom">
              <div className="Theme__container">
                <div className="theme__inner">
                  <div className="theme__title">Theme</div>
                  <div className="theme__divider" />
                  <div className="theme__carousel-wrapper">
                    <button
                      className="theme__arrow left"
                      onClick={() => scrollTheme(-1)}
                    >
                      {"<"}
                    </button>

                    <div className="theme__box-group" ref={themeScrollRef}>
                      {themes.map((theme, i) => (
                        <div
                          key={i}
                          className={`theme__box ${
                            selectedTheme === theme.name ? "selected" : ""
                          }`}
                          onClick={() => handleThemeSelect(theme.name)}
                        >
                          <img
                            src={theme.image}
                            alt={theme.name}
                            className="theme__image"
                          />
                          <span className="theme__label">{theme.name}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="theme__arrow right"
                      onClick={() => scrollTheme(1)}
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="generate__button"
              onClick={handleGenerate}
              disabled={!selectedTheme && !customPrompt.trim()}
            >
              Generate
            </button>
          </>
        )}

        {isGenerating && (
          <div className="loading__indicator">
            <div className="loader"></div>
          </div>
        )}

        {isGenerated && generatedImages && generatedImages.length > 0 && (
          <>
            {console.log("generatedImages:", generatedImages)}
            <div className="result__section">
              <div className="result__left">
                <div className="result__grid">
                  {generatedImages.map((img, i) => (
                    <img
                      key={i}
                      src={getImageUrl(img.tempImage)}
                      alt={`Generated ${i}`}
                      className="generated__image"
                      onClick={() => handleSelectImage(img)}
                    />
                  ))}
                </div>
                <button
                  className="regenerate__button-fixed"
                  onClick={handleRegenerate}
                >
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
                        <button
                          className="choose__button"
                          onClick={handleChoose}
                        >
                          선택
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="no__image">이미지를 선택해주세요</div>
                )}
              </div>
            </div>
          </>
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
