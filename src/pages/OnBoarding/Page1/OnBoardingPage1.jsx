import React from "react";
import "./OnBoardingPage1.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // 기본 스타일 import
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { animation } from "../../../styles/motion";

import framePicture from "../../../assets/onboardingPage1-content.png";
import img1_1 from "../../../assets/onboardingPage1-img1-1.png";
import img1_2 from "../../../assets/onboardingPage1-img1-2.png";
import img2_1 from "../../../assets/onboardingPage1-img2-1.png";
import img2_2 from "../../../assets/onboardingPage1-img2-2.png";
import img3_1 from "../../../assets/onboardingPage1-img3-1.png";
import img3_2 from "../../../assets/onboardingPage1-img3-2.png";
import img4_1 from "../../../assets/onboardingPage1-img4-1.png";
import img4_2 from "../../../assets/onboardingPage1-img4-2.png";
import img5_1 from "../../../assets/onboardingPage1-img5-1.png";
import img5_2 from "../../../assets/onboardingPage1-img5-2.png";

const slides = [
  { img1: img1_1, img2: img1_2 },
  { img1: img2_1, img2: img2_2 },
  { img1: img3_1, img2: img3_2 },
  { img1: img4_1, img2: img4_2 },
  { img1: img5_1, img2: img5_2 },
];

const OnBoardingPage1 = () => {
  return (
    <motion.article
      className="onboardingPage1"
      variants={animation.fadeInSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="onboardingPage1__title">
        <span>AI와 광고의 만남</span>
        <h2>
          광고 제작을 새롭게 정의하다
          <br />
          기획부터 완성까지 단 10분
        </h2>
      </div>

      <div className="onboardingPage1__content">
        {/* 바깥 이미지 트랙 - 여러 장 슬라이드 */}
        <div className="outer-swiper-wrapper">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            speed={2500}
            loop={true}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={15}
            allowTouchMove={false}
            className="outer-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                className="outer-swiper-slide"
                key={`outer-${index}`}
              >
                <div className="outer-slide">
                  <img src={slide.img1} alt={`outer-img-${index}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* TV 프레임 (고정 위치) */}
        <div className="tv-frame">
          <img src={framePicture} className="tv-frame__image" alt="TV Frame" />
          <div className="tv-screen">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              speed={2500}
              loop={true}
              slidesPerView={1}
              allowTouchMove={false}
              className="tv-swiper"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={`tv-${index}`}>
                  <img
                    src={slide.img2}
                    className="tv-img"
                    alt={`tv-img-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default OnBoardingPage1;
