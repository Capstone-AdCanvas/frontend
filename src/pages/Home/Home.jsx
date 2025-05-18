import React from "react";
import "./Home.css";
import Box from "../../components/Box/Box";
import imagePicture from "../../assets/home-aiimage.png";
import videoPicture from "../../assets/home-aivideo.png";

function Home() {
  return (
    <div className="homePage">
      <div className="homePage__title">
        <p className="home-subtitle">Redifinig Ad Creation with AI</p>
        <h3 className="home-title">Personal AI Creative Studio</h3>
      </div>
      <div className="AI_buttons">
        <button className="AI_buttons__image">
          <div className="AI_buttons__image--inner">
            <h3>AI Image</h3>
            <p>Turn Ideas into image</p>
            <div className="AI_buttons__image--inner__image">
              <img src={imagePicture} alt="" />
            </div>
          </div>
        </button>
        <button className="AI_buttons__video">
          <div className="AI_buttons__video--inner">
            <h3>AI Video</h3>
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
            <Box
              width={310}
              height={204}
              title="Image 1"
              userImage="https://via.placeholder.com/50"
              username="User1"
            />
            <Box
              width={310}
              height={204}
              title="Image 2"
              userImage="https://via.placeholder.com/50"
              username="User2"
            />
            <Box
              width={310}
              height={204}
              title="Image 3"
              userImage="https://via.placeholder.com/50"
              username="User3"
            />
            <Box
              width={310}
              height={204}
              title="Image 4"
              userImage="https://via.placeholder.com/50"
              username="User4"
            />
          </div>
        </div>
        <div className="others__video">
          <p>Videos from others</p>
          <div className="others__box">
            <Box
              width={310}
              height={204}
              title="Video 1"
              userImage="https://via.placeholder.com/50"
              username="User1"
            />
            <Box
              width={310}
              height={204}
              title="Video 2"
              userImage="https://via.placeholder.com/50"
              username="User2"
            />
            <Box
              width={310}
              height={204}
              title="Video 3"
              userImage="https://via.placeholder.com/50"
              username="User3"
            />
            <Box
              width={310}
              height={204}
              title="Video 4"
              userImage="https://via.placeholder.com/50"
              username="User4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
