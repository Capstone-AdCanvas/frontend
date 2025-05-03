import React from "react";
import { motion } from "motion/react";
import { animation, containerVariant } from "../../../styles/motion";
import "./OnBoardingPage5.css";
import { useNavigate } from "react-router-dom";

const OnBoardingPage5 = () => {
  const navigate = useNavigate();

  return (
    <article className="onboardingPage5">
      <div className="onboardingPage5__content">
        <motion.div
          className="onboardingPage5__content__introduce"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span className="title1" variants={animation.fadeInSlideUp}>
            효율적인
          </motion.span>
          <motion.span className="title2" variants={animation.fadeInSlideUp}>
            디지털 마케팅 서비스를
          </motion.span>
          <motion.span className="title3" variants={animation.fadeInSlideUp}>
            제공합니다
          </motion.span>
          <motion.span className="title4" variants={animation.fadeInSlideUp}>
            <span>AdCanvas</span> 와 함께 시작하세요!
          </motion.span>
        </motion.div>
        <motion.button
          className="onboardingPage5__button"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.5 }}
          onClick={() => {
            navigate("/login");
          }}
        >
          <span>AdCanvas</span>와
          <br />
          함께 시작하기
        </motion.button>
      </div>
    </article>
  );
};

export default OnBoardingPage5;
