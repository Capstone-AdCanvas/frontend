import React from "react";
import "./Home.css";
import Box from "../../components/Box/Box";
import imagePicture from "../../assets/home-aiimage.png";
import videoPicture from "../../assets/home-aivideo.png";
import { useNavigate } from "react-router-dom";

import sampleImg1 from "../../assets/sample/sample-images/샘플이미지1.jpg";
import sampleImg2 from "../../assets/sample/sample-images/샘플이미지2.jpg";
import sampleImg3 from "../../assets/sample/sample-images/샘플이미지3.jpg";
import sampleImg4 from "../../assets/sample/sample-images/샘플이미지4.jpg";

import sampleVideo1 from "../../assets/sample/sample-videos/샘플영상1.mp4";
import sampleVideo5 from "../../assets/sample/sample-videos/샘플영상5.mp4";
import sampleVideo3 from "../../assets/sample/sample-videos/샘플영상3.mp4";
import sampleVideo4 from "../../assets/sample/sample-videos/샘플영상4.mp4";

function Home() {
  const navigate = useNavigate();

  const handleAiImageClick = () => {
    navigate("/AiImages");
  };
  const handleAiVideoClick = () => {
    navigate("/AiVideos");
  };

  return (
    <div className="homePage">
      <div className="homePage__title">
        <p className="home-subtitle">Redifinig Ad Creation with AI</p>
        <h3 className="home-title">Personal AI Creative Studio</h3>
      </div>
      <div className="AI_buttons">
        <button className="AI_buttons__image" onClick={handleAiImageClick}>
          <div className="AI_buttons__image--inner">
            <h3>Create AI Image</h3>
            <p>Turn Ideas into image</p>
            <div className="AI_buttons__image--inner__image">
              <img src={imagePicture} alt="" />
            </div>
          </div>
        </button>
        <button className="AI_buttons__video" onClick={handleAiVideoClick}>
          <div className="AI_buttons__video--inner">
            <h3>Create AI Video</h3>
            <p>Turn Ideas into Video</p>
            <div className="AI_buttons__video--inner__image">
              <img src={videoPicture} alt="" />
            </div>
          </div>
        </button>
      </div>
      <div className="others">
        <div className="others__image">
          <p>Images from Others</p>
          <div className="others__box">
            <Box width={310} height={204} title="Image 1" username="User1">
              <img src={sampleImg1} alt="샘플이미지1" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#222" }} />
            </Box>
            <Box width={310} height={204} title="Image 2" username="User2">
              <img src={sampleImg2} alt="샘플이미지2" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#222" }} />
            </Box>
            <Box width={310} height={204} title="Image 3" username="User3">
              <img src={sampleImg3} alt="샘플이미지3" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#222" }} />
            </Box>
            <Box width={310} height={204} title="Image 4" username="User4">
              <img src={sampleImg4} alt="샘플이미지4" style={{ width: "100%", height: "100%", objectFit: "cover", background: "#222" }} />
            </Box>
          </div>
        </div>
        <div className="others__video">
          <p>Videos from others</p>
          <div className="others__box">
            <Box width={310} height={204} title="Video 1" username="User1">
              <video src={sampleVideo1} width="100%" height="100%" controls />
            </Box>
            <Box width={310} height={204} title="Video 2" username="User2">
              <video src={sampleVideo5} width="100%" height="100%" controls />
            </Box>
            <Box width={310} height={204} title="Video 3" username="User3">
              <video src={sampleVideo3} width="100%" height="100%" controls />
            </Box>
            <Box width={310} height={204} title="Video 4" username="User4">
              <video src={sampleVideo4} width="100%" height="100%" controls />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
