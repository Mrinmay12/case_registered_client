import React, { useState, useRef } from "react";
import "./OtpInput.css";
import apiUrl from "../ApiAxios";

const OtpInput = ({setToken,email}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move focus to the next input box
    if (element.value.length === 1 && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
let otpdata=otp.join('')
  const json = JSON.stringify({
    email,
    otp:otpdata ,
  });

const [loader, setLoder] = useState(false);
const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    setLoder(true);
    setErr(false)
    try {
      let response =  await apiUrl.post('loginnext',json);
      if (response) {
        setLoder(false);

        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
      }
    } catch (err) {
      setErr(true)
      setLoder(false);
    }
  };

  return (
    <div className="otp-container" style={{ marginTop:"83px" }}>
      <h2>Enter OTP</h2>
      <div className="otp-inputs">
        {otp.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            value={otp[index]}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            autoFocus={index === 0 ? true : false}
          />
        ))}
      </div>
      {err &&<span style={{ color:"red" }}>Invalid otp</span>}
        {loader ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        )}
       
    
    </div>
  );
};

export default OtpInput;
