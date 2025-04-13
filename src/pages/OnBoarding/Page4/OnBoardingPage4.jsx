import React, { useEffect, useRef, useState } from "react";
import "./OnBoardingPage4.css";

import img1 from "../../../assets/onboardingPage4-img1.png";
import img2 from "../../../assets/onboardingPage4-img2.png";
import img3 from "../../../assets/onboardingPage4-img3.png";
import img4 from "../../../assets/onboardingPage4-img4.png";

const OnBoardingPage4 = () => {
  /* 페이지 fade-in, fade-out하는 코드 */
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  /* 페이지 fade-in, fade-out하는 코드 */

  return (
    <article
      ref={sectionRef}
      className={`onboardingPage4 ${inView ? "fade-in" : "fade-out"}`}
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
          <img className="img1" src={img1} alt="" />
          <img className="img2" src={img2} alt="" />
          <img className="img3" src={img3} alt="" />
          <img className="img4" src={img4} alt="" />
        </div>
      </div>
    </article>
  );
};

export default OnBoardingPage4;
