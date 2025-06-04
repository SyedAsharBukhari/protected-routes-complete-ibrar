import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Create an array of 5 refs correctly
  const inputsRef = useRef([]);

  const BASE_URL = 'https://api-hayala-c4bbacb8319e.herokuapp.com/api/v1/verify-otp';

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length < 5) {
      setMessage("❌ Please enter all 5 digits");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(BASE_URL, { otp: otpCode });
      setMessage(`✅ ${response.data.message || 'OTP Verified Successfully'}`);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || 'OTP Verification Failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Enter OTP</h3>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="d-flex justify-content-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="form-control text-center mx-1"
                style={{ width: "50px", fontSize: "24px" }}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {message && <div className="mt-3 text-center">{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default Otp;
