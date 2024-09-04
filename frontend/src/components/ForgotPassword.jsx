import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/send-otp', { email });
      console.log('OTP sent:', response.data);
      setStep(2);
    } catch (err) {
      console.error('Error sending OTP:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/verify-otp', { email, otp, newPassword });
      console.log('Password reset successful');
      navigate('/signin');
    } catch (err) {
      console.error('Error verifying OTP:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Failed to verify OTP');
    }
  };

  return (
    <div className="forgot-password-main">
      {step === 1 ? (
        <div className="forgot-password-container">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive an OTP to reset your password.</p>
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Send OTP</button>
          </form>
        </div>
      ) : (
        <div className="forgot-password-container">
          <h2>Verify OTP</h2>
          <p>Enter the OTP sent to your email and set your new password.</p>
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <div className="pass-input-div">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Reset Password</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
