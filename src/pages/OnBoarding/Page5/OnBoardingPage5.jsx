import React, { useEffect, useRef, useState } from "react";
import "./OnBoardingPage5.css";

const OnBoardingPage5 = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // 각 타이틀과 버튼 활성화 여부
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);

          // 순차 애니메이션 타이밍
          setTimeout(() => setStep1(true), 500); // title1
          setTimeout(() => setStep2(true), 1000); // title2
          setTimeout(() => setStep3(true), 1500); // title3
          setTimeout(() => setStep4(true), 2000); // title4
          setTimeout(() => setShowButton(true), 2000); // 버튼도 같이
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <article
      ref={sectionRef}
      className={`onboardingPage5 ${inView ? "fade-in" : "fade-out"}`}
    >
      <div className="onboardingPage5__content">
        <div className="onboardingPage5__content__introduce">
          <span className={`title1 ${step1 ? "fade-in" : "fade-out"}`}>
            효율적인
          </span>
          <span className={`title2 ${step2 ? "fade-in" : "fade-out"}`}>
            디지털 마케팅 서비스를
          </span>
          <span className={`title3 ${step3 ? "fade-in" : "fade-out"}`}>
            제공합니다
          </span>
          <span className={`title4 ${step4 ? "fade-in" : "fade-out"}`}>
            <span>AdCanvas</span> 와 함께 시작하세요!
          </span>
        </div>
        <button
          className={`onboardingPage5__button ${
            showButton ? "fade-in" : "fade-out"
          }`}
        >
          <span>AdCanvas</span>와
          <br />
          함께 시작하기
        </button>
      </div>
    </article>
  );
};

export default OnBoardingPage5;
