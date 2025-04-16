import React from "react";
import "./AiVideos.css";
import GradientBox from "../../components/GradientBox/GradientBox";

function AiVideos() {
  return (
    <section className="aiVideos">
      <article className="aiVideos__initial">
        <div className="aiVideos__initial__btn">
          <button>Text to Video</button>
          <button>Image to Video</button>
        </div>
        <GradientBox width={400} height={375} className="prompt">
          <div className="prompt__screen">
            <span className="prompt__screen__title">prompt</span>
            <input
              className="prompt__screen__input"
              type="text"
              placeholder="프롬프트 예시들"
            />
          </div>
        </GradientBox>
      </article>
    </section>
  );
}

export default AiVideos;
