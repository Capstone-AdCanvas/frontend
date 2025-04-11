import React from "react";
import "./OnBoarding.css";
import OnBoardingPage1 from "./Page1/OnBoardingPage1";
import OnBoardingPage2 from "./Page2/OnBoardingPage2";
import OnBoardingPage3 from "./Page3/OnBoardingPage3";
import OnBoardingPage4 from "./Page4/OnBoardingPage4";
import OnBoardingPage5 from "./Page5/OnBoardingPage5";

const OnBoarding = () => {
  return (
    <section className="onboardingPage">
      <OnBoardingPage1 />
      <OnBoardingPage2 />
      <OnBoardingPage3 />
      <OnBoardingPage4 />
      <OnBoardingPage5 />
    </section>
  );
};

export default OnBoarding;
