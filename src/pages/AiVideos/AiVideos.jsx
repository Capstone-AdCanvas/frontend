import React, { useState } from "react";
import "./AiVideos.css";
import TexttoVideo from "../../components/TexttoVideo/TexttoVideo";
import ImagetoVideo from "../../components/ImagetoVideo/ImagetoVideo";

function AiVideos() {
  const [activeTab, setActiveTab] = useState("text"); // 기본은 Text to Video

  return (
    <section className="aiVideos">
      <main className="aiVideos__initial">
        <TexttoVideo activeTab={activeTab} setActiveTab={setActiveTab} />
        <ImagetoVideo activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
    </section>
  );
}

export default AiVideos;
