import React, { useEffect } from "react";
import { gsap } from "gsap";

const MouseTrail = () => {
  useEffect(() => {
    const wobble = 2;
    const thickness = 1.5;
    const maxLength = 25;
    let colorBase = 300;

    let mousePos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    let mouseUp = true;
    let pts = [];

    const container = document.getElementById("mouse-trail-container");

    const polyline = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline"
    );
    container.appendChild(polyline);

    gsap.set(polyline, {
      attr: {
        id: "trail",
        stroke: `hsl(${colorBase}, 100%, 50%)`,
        "stroke-width": thickness,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        fill: "none",
      },
    });

    pts.push(`${mousePos.x},${mousePos.y}`);

    const randPt = (x, y, amt) =>
      `${gsap.utils.random(x - amt, x + amt)},${gsap.utils.random(
        y - amt,
        y + amt
      )}`;

    window.onmousedown = () => (mouseUp = false);
    window.onmouseup = () => (mouseUp = true);

    window.onmousemove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      colorBase++;
      gsap.to("#trail", {
        attr: {
          stroke: `hsl(${colorBase}, 100%, 50%)`,
        },
        duration: 0.3,
        ease: "none",
      });
    };

    const update = () => {
      if (pts.length < maxLength) {
        pts.push(randPt(mousePos.x, mousePos.y, wobble));
      } else {
        pts.shift();
        pts.push(randPt(mousePos.x, mousePos.y, wobble));
      }

      const pointsString = pts.join(" ");

      if (mouseUp) {
        gsap.to("#trail", {
          duration: 0.4,
          attr: { points: pointsString },
          ease: "power2.out",
        });
      } else {
        gsap.set("#trail", {
          attr: { points: pointsString },
        });
      }
    };

    gsap.ticker.add(update);

    return () => {
      container.innerHTML = "";
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <svg
      id="mouse-trail-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    />
  );
};

export default MouseTrail;
