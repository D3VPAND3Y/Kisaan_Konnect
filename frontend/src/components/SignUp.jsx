import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/SignUp.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/user/signup", {
        fullName,
        useremail: email,
        password,
      });

      navigate("/signin");
    } catch (err) {
      console.error("Signup failed:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : "Signup failed");
    }
  };

  return (
    <div className="signup-main">
      <div className="signup-left">
        <img src={Image} alt="Sign Up" />
      </div>
      <div className="signup-right">
        <div className="signup-right-container">
          <div className="signup-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="signup-center">
            <h2>Create an Account</h2>
            <p>Fill in the details below to create a new account</p>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="signup-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="button" className="google-button">
                  <img src={GoogleSvg} alt="Google Icon" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>
          <p className="signup-bottom-p">
            Already have an account? <Link to="/signin">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
