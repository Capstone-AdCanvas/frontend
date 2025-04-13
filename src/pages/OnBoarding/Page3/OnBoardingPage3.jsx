import React, { useEffect, useRef, useState } from "react";
import "./OnBoardingPage3.css";

const OnBoardingPage3 = () => {
  /* 페이지 fade-in-left, fade-out-right하는 코드 */
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
  /* 페이지 fade-in-left, fade-out-right하는 코드 */

  return (
    <article
      ref={sectionRef}
      className={`onboardingPage3 ${
        inView ? "fade-in-left" : "fade-out-right"
      }`}
    >
      <div className="onboardingPage3__content">
        <h2>
          복잡한 편집 없이,
          <br />
          문구만 입력하여 자동 생성
        </h2>
        <div className="onboardingPage3__content__screen">
          (영상 제작 보여주는 화면)
        </div>
      </div>
    </article>
  );
};

export default OnBoardingPage3;
