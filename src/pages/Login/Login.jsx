import React from "react";
import "./Login.css";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/home");
    }
  };

  return (
    <section className="loginPage">
      <div
        className={`move ${isSignIn ? "moving" : "start"}`}
        style={{
          backgroundPosition: isSignIn ? "right" : "left",
          borderRadius: isSignIn ? "0px 15px 15px 0px" : "15px 0px 0px 15px",
        }}
      >
        <div
          className="p-button normal signin animated pulse"
          onClick={handleToggle}
        >
          {isSignIn ? "SIGN IN" : "SIGN UP"}
        </div>
      </div>

      <div className="welcome" style={{ display: isSignIn ? "none" : "block" }}>
        <h4 className="bold welcome-text">Welcome Back!</h4>
        <p className="normal text">
          To keep connected with us please login with your personal info
        </p>
      </div>

      <div className="hello" style={{ display: isSignIn ? "block" : "none" }}>
        <h4 className="bold welcome-text">Hello Friend</h4>
        <p className="normal text">
          Enter your personal details and start to draw canvas with us
        </p>
      </div>

      <div
        className={`form ${isSignIn ? "movingForm" : "startForm"}`}
        style={{
          transform: isSignIn ? "translate(0px)" : "translate(400px)",
          borderRadius: isSignIn ? "15px 0px 0px 15px" : "0px 15px 15px 0px",
        }}
      >
        <h4 className="bold title">
          {isSignIn ? "Sign-in in to AdCanvas" : "Create Account"}
        </h4>

        <div className="icons">
          <div className="icon">
            <i class="fa-brands fa-instagram"></i>
          </div>
        </div>

        <p className="normal light">
          {isSignIn
            ? "Or use your email account"
            : "Or use your email for registration"}
        </p>

        {!isSignIn && (
          <input
            type="text"
            placeholder="Name"
            className="normal name login__input"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="normal login__input"
          onKeyDown={handleKeyDown}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="normal login__input"
          onKeyDown={handleKeyDown}
        />
        <br />
        {isSignIn && <p className="normal forgot">Forgot your password?</p>}

        <button className="b-button normal">
          {isSignIn ? "SIGN IN" : "SIGN UP"}
        </button>
      </div>
    </section>
  );
}

export default Login;
