import React from "react";
import { motion } from "framer-motion";
import { animation } from "../../../styles/motion";
import "./OnBoardingPage3.css";
import sampleImg from "../../../assets/onboardingPage3-sample-img.png";

const OnBoardingPage3 = () => {
  return (
    <motion.article
      className="onboardingPage3"
      variants={animation.fadeInSlideRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="onboardingPage3__content">
        <h2>
          복잡한 편집 없이,
          <br />
          문구만 입력하여 자동 생성
        </h2>
        <div className="onboardingPage3__content__screen">
          <img
            className="onboardingPage3__content__screen__img"
            src={sampleImg}
            alt=""
          />
        </div>
      </div>
    </motion.article>
  );
};

export default OnBoardingPage3;
