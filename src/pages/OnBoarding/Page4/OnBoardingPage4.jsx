import React from "react";
import { motion } from "motion/react";
import { animation } from "../../../styles/motion";
import "./OnBoardingPage4.css";

import img1 from "../../../assets/onboardingPage4-img1.png";
import img2 from "../../../assets/onboardingPage4-img2.png";
import img3 from "../../../assets/onboardingPage4-img3.png";
import img4 from "../../../assets/onboardingPage4-img4.png";

const OnBoardingPage4 = () => {
  return (
    <motion.article
      className="onboardingPage4"
      variants={animation.fadeInSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="onboardingPage4__content">
        <h2>
          <span>다채널 광고, </span>하나의 흐름으로
        </h2>
        <span>
          처음부터 끝까지 페이지 이동 없이
          <br />
          모든 채널에 광고를 쉽고 빠르게 연결해보세요
        </span>
        <div className="onboardingPage4__content__image">
          <motion.img
            className="img1"
            src={img1}
            alt=""
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 1.05 }}
          />
          <motion.img
            className="img2"
            src={img2}
            alt=""
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 1.05 }}
          />
          <motion.img
            className="img3"
            src={img3}
            alt=""
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 1.05 }}
          />
          <motion.img
            className="img4"
            src={img4}
            alt=""
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 1.05 }}
          />
        </div>
      </div>
    </motion.article>
  );
};

export default OnBoardingPage4;
