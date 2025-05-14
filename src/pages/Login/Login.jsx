import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";
import { registerUser } from "../../api/user";

function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleToggle = () => setIsSignIn((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") navigate("/home");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
  e.preventDefault();
  try {
    const response = await registerUser({
      name: formData.username,
      email: formData.email,
      password: formData.password
    });
    console.log("Registration successful:", response);
    setIsSignIn(true);
    setFormData({ username: "", email: "", password: "" });
    setError("");
  } catch (error) {
    setError(error.message || "회원가입 중 오류가 발생했습니다.");
  }
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

  const AuthForm = useMemo(() => {
    return (
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
            name="username"
            placeholder="Username"
            className="login__normal login__input"
            value={formData.username}
            onChange={handleInputChange}
          />
        )}

        <input
          type="text"
          name="email"
          placeholder="Email"
          className="login__normal login__input"
          value={formData.email}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login__normal login__input"
          value={formData.password}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <br />

        {error && <p className="login__normal" style={{ color: "red" }}>{error}</p>}

        {isSignIn && (
          <p className="login__normal login__forgot">Forgot your password?</p>
        )}

        <button 
          className="b-button login__normal"
          onClick={!isSignIn ? handleSignUp : undefined}
        >
          {isSignIn ? "SIGN IN" : "SIGN UP"}
        </button>
      </div>
    );
  }, [isSignIn, formData, error, handleInputChange, handleKeyDown, handleSignUp]);

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
      {AuthForm}
    </article>
  );
}

export default Login;
