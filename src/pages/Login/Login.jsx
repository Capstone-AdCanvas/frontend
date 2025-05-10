import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";

function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsSignIn((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") navigate("/home");
  };

  const WelcomeSection = () => (
    <div
      className="login__welcome"
      style={{ display: isSignIn ? "none" : "block" }}
    >
      <h4 className="login__bold login__welcome-text">Welcome Back!</h4>
      <p className="login__normal login__text">
        To keep connected with us please login with your personal info
      </p>
    </div>
  );

  const HelloSection = () => (
    <div
      className="login__hello"
      style={{ display: isSignIn ? "block" : "none" }}
    >
      <h4 className="login__bold login__welcome-text">Hello Friend</h4>
      <p className="login__normal login__text">
        Enter your personal details and start to draw canvas with us
      </p>
    </div>
  );

  const AuthForm = () => (
    <div
      className={`login__form ${
        isSignIn ? "login__movingForm" : "login__startForm"
      }`}
      style={{
        transform: isSignIn ? "translate(0px)" : "translate(400px)",
        borderRadius: isSignIn ? "15px 0px 0px 15px" : "0px 15px 15px 0px",
      }}
    >
      <h4 className="login__bold">
        {isSignIn ? "Sign-in in to AdCanvas" : "Create Account"}
      </h4>

      <div className="login__icons">
        <div className="login__icon">
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>

      <p className="login__normal login__light">
        {isSignIn
          ? "Or use your email account"
          : "Or use your email for registration"}
      </p>

      {!isSignIn && (
        <input
          type="text"
          placeholder="Username"
          className="login__normal login__input"
        />
      )}

      <input
        type="text"
        placeholder="Email"
        className="login__normal login__input"
        onKeyDown={handleKeyDown}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        className="login__normal login__input"
        onKeyDown={handleKeyDown}
      />
      <br />

      {isSignIn && (
        <p className="login__normal login__forgot">Forgot your password?</p>
      )}

      <button className="b-button login__normal">
        {isSignIn ? "SIGN IN" : "SIGN UP"}
      </button>
    </div>
  );

  return (
    <article className="loginPage">
      <div
        className={`login__move ${isSignIn ? "login__moving" : "login__start"}`}
        style={{
          backgroundPosition: isSignIn ? "right" : "left",
          borderRadius: isSignIn ? "0px 15px 15px 0px" : "15px 0px 0px 15px",
        }}
      >
        <div className="p-button login__normal" onClick={handleToggle}>
          {isSignIn ? "SIGN IN" : "SIGN UP"}
        </div>
      </div>

      {isSignIn ? <HelloSection /> : <WelcomeSection />}
      <AuthForm />
    </article>
  );
}

export default Login;
