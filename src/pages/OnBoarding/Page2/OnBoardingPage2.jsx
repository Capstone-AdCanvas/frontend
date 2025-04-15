import React, { useEffect, useRef, useState } from "react";
import "./OnBoardingPage2.css";

const OnBoardingPage2 = () => {
  /* 페이지 fade-in-right, fade-out-left하는 코드 */
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
  /* 페이지 fade-in-right, fade-out-left하는 코드 */

  return (
    <article
      ref={sectionRef}
      className={`onboardingPage2 ${
        inView ? "fade-in-right" : "fade-out-left"
      }`}
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
    </article>
  );
};

export default OnBoardingPage2;
