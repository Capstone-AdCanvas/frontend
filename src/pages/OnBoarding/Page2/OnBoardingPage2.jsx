import React from "react";
import { motion } from "motion/react";
import { animation } from "../../../styles/motion";
import "./OnBoardingPage2.css";

const OnBoardingPage2 = () => {
  return (
    <motion.article
      className="onboardingPage2"
      variants={animation.fadeInSlideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="onboardingPage2__content">
        <div className="onboardingPage2__content__screen">
          (이미지 제작 보여주는 화면)
        </div>
        <h2>
          몇 번의 클릭으로
          <br />
          완성되는 맞춤형 디자인
        </h2>
      </div>
    </motion.article>
  );
};

export default OnBoardingPage2;
