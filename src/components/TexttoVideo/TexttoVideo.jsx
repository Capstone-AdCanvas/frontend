import React, { useState } from "react";
import "./TexttoVideo.css";
import GradientBox from "../GradientBox/GradientBox";

const TexttoVideo = () => {
  const [videoLength, setVideoLength] = useState(""); // option1
  const [bgm, setBgm] = useState(""); // option2
  const [ratio, setRatio] = useState(""); // option3
  const [script, setScript] = useState(""); // option4

  return (
    <article className="texttovideo">
      <GradientBox width={400} height={375} className="prompt">
        <div className="prompt__screen">
          <span className="prompt__screen__title">Prompt</span>
          <textarea
            className="prompt__screen__input"
            placeholder="프롬프트 예시들"
          />
        </div>
      </GradientBox>

      <GradientBox width={400} height={400} className="settings">
        <div className="settings__screen">
          <span className="settings__screen__title">Settings</span>
          <div className="settings__screen__main">
            {/* Option 1: 영상 길이 */}
            <div className="settings__screen__main__option1">
              <span>영상 길이 조절</span>
              <div className="settings__screen__main__option1__btn">
                <button
                  className={videoLength === "5s" ? "active" : ""}
                  onClick={() => setVideoLength("5s")}
                >
                  5s
                </button>
                <button
                  className={videoLength === "10s" ? "active" : ""}
                  onClick={() => setVideoLength("10s")}
                >
                  10s
                </button>
                <button
                  className={videoLength === "15s" ? "active" : ""}
                  onClick={() => setVideoLength("15s")}
                >
                  15s
                </button>
              </div>
            </div>
            {/* Option 2: 배경음악 */}
            <div className="settings__screen__main__option2">
              <span>배경음악</span>
              <div className="settings__screen__main__option2__btn">
                <button
                  className={bgm === "on" ? "active" : ""}
                  onClick={() => setBgm("on")}
                >
                  On
                </button>
                <button
                  className={bgm === "off" ? "active" : ""}
                  onClick={() => setBgm("off")}
                >
                  Off
                </button>
              </div>
            </div>
            {/* Option 3: 영상크기 */}
            <div className="settings__screen__main__option3">
              <span>영상크기</span>
              <div className="settings__screen__main__option3__btn">
                <button
                  className={ratio === "16:9" ? "active" : ""}
                  onClick={() => setRatio("16:9")}
                >
                  16:9
                </button>
                <button
                  className={ratio === "9:16" ? "active" : ""}
                  onClick={() => setRatio("9:16")}
                >
                  9:16
                </button>
                <button
                  className={ratio === "1:1" ? "active" : ""}
                  onClick={() => setRatio("1:1")}
                >
                  1:1
                </button>
              </div>
            </div>
            {/* Option 4: 대본 */}
            <div className="settings__screen__main__option4">
              <span>대본</span>
              <div className="settings__screen__main__option4__btn">
                <button
                  className={script === "on" ? "active" : ""}
                  onClick={() => setScript("on")}
                >
                  On
                </button>
                <button
                  className={script === "off" ? "active" : ""}
                  onClick={() => setScript("off")}
                >
                  Off
                </button>
              </div>
            </div>
          </div>
        </div>
      </GradientBox>
    </article>
  );
};

export default TexttoVideo;
