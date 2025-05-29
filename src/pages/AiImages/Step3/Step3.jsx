import React, { useState, useEffect, useRef } from "react";
import "./Step3.css";
import ImageUploadBox from "../../../components/ImageUploadBox/ImageUploadBox";
import { uploadLogo, getLogos, combineImage } from "../../../api/image";
import GradientBox from '../../../components/GradientBox/GradientBox';

function Step3({ setCurrentStep, selectedImage }) {
  const [logos, setLogos] = useState([]);
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 100, y: 100 });
  const [logoScale, setLogoScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgNaturalSize, setImgNaturalSize] = useState({ width: 0, height: 0 });
  const [renderedSize, setRenderedSize] = useState({ width: 1, height: 1 });
  const imageRef = useRef(null);

  useEffect(() => {
    fetchLogos();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      console.log('Step3 received selectedImage:', selectedImage);
      setCurrentImage(selectedImage);
    }
  }, [selectedImage]);

  const fetchLogos = async () => {
    try {
      const response = await getLogos();
      console.log('로고 데이터:', response);
      setLogos(response);
    } catch (error) {
      console.error('로고 조회 실패:', error);
    }
  };

  const handleLogoUpload = async (file) => {
    try {
      const response = await uploadLogo(file);
      console.log('로고 업로드 응답:', response);
      fetchLogos();
    } catch (error) {
      console.error('로고 업로드 실패:', error);
    }
  };

  const handleLogoSelect = (logo) => {
    console.log('선택된 로고:', logo);
    setSelectedLogo(logo.logoImage);
    setLogoPosition({ x: 0, y: 0 });
    setLogoScale(1);
  };

  const handleMouseDown = (e) => {
    if (!selectedLogo) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - logoPosition.x,
      y: e.clientY - logoPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedLogo) return;
    setLogoPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (!selectedLogo) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setLogoScale(prev => Math.max(0.1, Math.min(2, prev + delta)));
  };

  const imageOnLoad = (e) => {
    setImgNaturalSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
    setRenderedSize({
      width: e.target.offsetWidth,
      height: e.target.offsetHeight
    });
  };

  const handleNextStep = async () => {
    if (!selectedLogo) {
      alert('로고를 선택해주세요.');
      return;
    }

    if (!currentImage) {
      alert('기본 이미지가 없습니다.');
      return;
    }

    try {
      const x = Math.round((logoPosition.x / renderedSize.width) * imgNaturalSize.width);
      const y = Math.round((logoPosition.y / renderedSize.height) * imgNaturalSize.height);
      const overlays = [{
        type: 'logo',
        x,
        y,
        imageUrl: selectedLogo,
        scale: parseFloat(logoScale.toFixed(2))
      }];

      console.log('이미지 합성 API 요청 데이터:', { baseImage: currentImage, overlays });

      const result = await combineImage(currentImage, overlays);
      console.log('이미지 합성 API 응답:', result);

      setCurrentStep(4, { selectedImage: result.finalImage });
    } catch (error) {
      console.error('이미지 합성 실패:', error);
      alert('이미지 합성에 실패했습니다.');
    }
  };

  return (
    <div className="step3">
      <div className="step3__container">
        <div className="step3__left">
          <GradientBox width={"550px"} height={"700px"}>
            <div className="step4__content">
              <div 
                className="step3__image"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                {currentImage && <img src={currentImage} alt="Selected" ref={imageRef} onLoad={imageOnLoad} />}
                {selectedLogo && (
                  <img
                    src={selectedLogo}
                    alt="Selected Logo"
                    style={{
                      position: 'absolute',
                      left: logoPosition.x,
                      top: logoPosition.y,
                      transform: `scale(${logoScale})`,
                      cursor: 'move',
                      maxWidth: '100px',
                      maxHeight: '100px'
                    }}
                  />
                )}
              </div>
            </div>
          </GradientBox>
        </div>
        <div className="step3__right">
          <div className="step3__upload">
            <ImageUploadBox
              title="로고 업로드"
              uploadTitle="Click to Upload or drag and drop"
              supportText="Support JPG/PNG Files"
              width="600px"
              height="700px"
              uploadBoxWidth="510px"
              uploadBoxHeight="300px"
              showMyLogoBox={true}
              onFileUpload={handleLogoUpload}
              logos={logos}
              onLogoSelect={handleLogoSelect}
            />
          </div>
        </div>
      </div>
      <button className="next-step-button" onClick={handleNextStep}>
        &gt;
      </button>
    </div>
  );
}

export default Step3;
