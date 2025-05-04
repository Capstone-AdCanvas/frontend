import React from "react";
import "./Settings.css";
import settingsIcon from "../../../assets/logo-settings.png";

const Settings = ({
  videoLength,
  setVideoLength,
  bgm,
  setBgm,
  ratio,
  setRatio,
  script,
  setScript,
}) => {
  return (
    <div className="settings__screen">
      <span className="settings__screen__title">
        <img src={settingsIcon} alt="" />
        Settings
      </span>
      <div className="settings__screen__main">
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
        <div className="settings__screen__main__option3">
          <span>영상크기</span>
          <div className="settings__screen__main__option3__btn">
            <button
              className={ratio === "16:9" ? "active" : ""}
              onClick={() => setRatio("16:9")}
            >
              <div className="ratio-box ratio-16by9" />
              16:9
            </button>
            <button
              className={ratio === "9:16" ? "active" : ""}
              onClick={() => setRatio("9:16")}
            >
              <div className="ratio-box ratio-9by16" />
              9:16
            </button>
            <button
              className={ratio === "1:1" ? "active" : ""}
              onClick={() => setRatio("1:1")}
            >
              <div className="ratio-box ratio-1by1" />
              1:1
            </button>
          </div>
        </div>
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
  );
};

export default Settings;
