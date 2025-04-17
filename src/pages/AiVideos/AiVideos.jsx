import React, { useState } from "react";
import "./AiVideos.css";
import TexttoVideo from "./TexttoVideo/TexttoVideo";
import ImagetoVideo from "./ImagetoVideo/ImagetoVideo";

function AiVideos() {
  const [activeTab, setActiveTab] = useState("text"); // 기본은 Text to Video

  return (
    <section className="aiVideos">
      <main className="aiVideos__initial">
        <div className="aiVideos__initial__btn">
          <button
            className={`texttovideo__btn ${
              activeTab === "text" ? "active" : ""
            }`}
            onClick={() => setActiveTab("text")}
          >
            Text to Video
          </button>
          <button
            className={`imagetovideo__btn ${
              activeTab === "image" ? "active" : ""
            }`}
            onClick={() => setActiveTab("image")}
          >
            Image to Video
          </button>
        </div>
        {activeTab === "text" && <TexttoVideo />}
        {activeTab === "image" && <ImagetoVideo />}
      </main>
    </section>
  );
}

export default AiVideos;
