import React from "react";
import "./Home.css";

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
        </div>
        </button>
        <button className="AI_buttons__video">
        <h3>AI Video</h3>
        <p>Turn Ideas into Video</p>
          </button>
      </div>
      <div className="others">
        
      </div>
    </div>
  );
}

export default Home;
