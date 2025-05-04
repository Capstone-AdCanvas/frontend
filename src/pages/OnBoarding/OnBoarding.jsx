import React from "react";
import "./OnBoarding.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import OnBoardingPage1 from "./Page1/OnBoardingPage1";
import OnBoardingPage2 from "./Page2/OnBoardingPage2";
import OnBoardingPage3 from "./Page3/OnBoardingPage3";
import OnBoardingPage4 from "./Page4/OnBoardingPage4";
import OnBoardingPage5 from "./Page5/OnBoardingPage5";

const OnBoarding = () => {
  return (
    <>
      <Swiper
        direction="vertical"
        modules={[Mousewheel]}
        mousewheel
        speed={800}
        className="onboardingPageSwiper"
      >
        <SwiperSlide>
          <OnBoardingPage1 />
        </SwiperSlide>
        <SwiperSlide>
          <OnBoardingPage2 />
        </SwiperSlide>
        <SwiperSlide>
          <OnBoardingPage3 />
        </SwiperSlide>
        <SwiperSlide>
          <OnBoardingPage4 />
        </SwiperSlide>
        <SwiperSlide>
          <OnBoardingPage5 />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default OnBoarding;
