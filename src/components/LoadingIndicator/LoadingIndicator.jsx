import React, { useEffect, useRef } from "react";
import "./LoadingIndicator.css";

const LoadingIndicator = ({ width = 400, height = 300 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    // canvas 해상도 설정
    c.width = width;
    c.height = height;

    const rand = (a, b) => ~~(Math.random() * (b - a + 1) + a);
    const dToR = (degrees) => degrees * (Math.PI / 180);

    const circle = {
      x: width / 2 + 5,
      y: height / 2 + 22,
      radius: 90,
      speed: 2,
      rotation: 0,
      angleStart: 270,
      angleEnd: 90,
      hue: 220,
      thickness: 18,
      blur: 25,
    };

    const particles = [];
    const particleMax = 100;

    let gradient1 = ctx.createLinearGradient(
      0,
      -circle.radius,
      0,
      circle.radius
    );
    gradient1.addColorStop(0, `hsla(${circle.hue}, 60%, 50%, .25)`);
    gradient1.addColorStop(1, `hsla(${circle.hue}, 60%, 50%, 0)`);

    // 외곽 테두리 그라디언트 (얇은 선 테두리)
    let gradient2 = ctx.createLinearGradient(
      -circle.radius,
      0,
      circle.radius,
      0
    );
    gradient2.addColorStop(0.0, "#F289FF");
    gradient2.addColorStop(0.36, "#9384FE");
    gradient2.addColorStop(0.72, "#80B4FF");
    gradient2.addColorStop(1.0, "#CADDE9");

    ctx.shadowBlur = circle.blur;
    ctx.shadowColor = `hsla(${circle.hue}, 80%, 60%, 1)`;
    ctx.lineCap = "round";

    const updateCircle = () => {
      circle.rotation = (circle.rotation + circle.speed) % 360;
    };

    const renderCircle = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation));
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        circle.radius,
        dToR(circle.angleStart),
        dToR(circle.angleEnd),
        true
      );
      ctx.lineWidth = circle.thickness;
      ctx.strokeStyle = gradient1;
      ctx.stroke();
      ctx.restore();
    };

    const renderCircleBorder = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation));
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        circle.radius + circle.thickness / 2,
        dToR(circle.angleStart),
        dToR(circle.angleEnd),
        true
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient2;
      ctx.stroke();
      ctx.restore();
    };

    const renderCircleFlare = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation + 185));
      ctx.beginPath();
      ctx.arc(0, circle.radius, 30, 0, Math.PI * 2);
      ctx.closePath();
      const gradient3 = ctx.createRadialGradient(
        0,
        circle.radius,
        0,
        0,
        circle.radius,
        30
      );
      gradient3.addColorStop(0, "hsla(330, 50%, 50%, .35)");
      gradient3.addColorStop(1, "hsla(330, 50%, 50%, 0)");
      ctx.fillStyle = gradient3;
      ctx.fill();
      ctx.restore();
    };

    const renderCircleFlare2 = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation + 165));
      ctx.scale(1.5, 1);
      ctx.beginPath();
      ctx.arc(0, circle.radius, 25, 0, Math.PI * 2);
      ctx.closePath();
      const gradient4 = ctx.createRadialGradient(
        0,
        circle.radius,
        0,
        0,
        circle.radius,
        25
      );
      gradient4.addColorStop(0, "hsla(30, 100%, 50%, .2)");
      gradient4.addColorStop(1, "hsla(30, 100%, 50%, 0)");
      ctx.fillStyle = gradient4;
      ctx.fill();
      ctx.restore();
    };

    const createParticles = () => {
      if (particles.length < particleMax) {
        particles.push({
          x:
            circle.x +
            circle.radius * Math.cos(dToR(circle.rotation - 85)) +
            (rand(0, circle.thickness * 2) - circle.thickness),
          y:
            circle.y +
            circle.radius * Math.sin(dToR(circle.rotation - 85)) +
            (rand(0, circle.thickness * 2) - circle.thickness),
          vx: (rand(0, 100) - 50) / 1000,
          vy: (rand(0, 100) - 50) / 1000,
          radius: rand(1, 6) / 2,
          alpha: rand(10, 20) / 100,
        });
      }
    };

    const updateParticles = () => {
      let i = particles.length;
      while (i--) {
        const p = particles[i];
        p.vx += (rand(0, 100) - 50) / 750;
        p.vy += (rand(0, 100) - 50) / 750;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;
        if (p.alpha < 0.02) particles.splice(i, 1);
      }
    };

    const renderParticles = () => {
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillRect(p.x, p.y, p.radius, p.radius);
        ctx.closePath();
        ctx.fillStyle = `hsla(0, 0%, 100%, ${p.alpha})`;
      });
    };

    const clear = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, .1)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
    };

    const loop = () => {
      clear();
      updateCircle();
      renderCircle();
      renderCircleBorder();
      renderCircleFlare();
      renderCircleFlare2();
      createParticles();
      updateParticles();
      renderParticles();
    };

    const interval = setInterval(loop, 16);
    return () => clearInterval(interval);
  }, [width, height]);

  return (
    <div className="loading-indicator" style={{ width, height }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default LoadingIndicator;
