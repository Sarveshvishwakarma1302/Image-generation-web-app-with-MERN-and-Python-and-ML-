import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./login.module.css";
import OTPForm from "./OTPForm";

const ForgotPasswordForm = ({ setState }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/user/forgot-password", {
        email,
      });
      if (data.success) {
        toast.success("OTP sent to your email.");
        setOtpSent(true);
      } else {
            // 💡 अगर बैकएंड से error message आए
            if (data.errors) {
              Object.values(data.errors).forEach((msg) => toast.error(msg));
            } else {
              toast.error(data.message || "Otp seinding is failed please try again ");
            }
          }
        } catch (err) {
          // 💥 Axios error को सही से हैंडल करें
          if (err.response && err.response.data) {
            const data = err.response.data;
            if (data.errors) {
              Object.values(data.errors).forEach((msg) => toast.error(msg));
            } else {
              toast.error(data.message || "OTP sending is Failed");
            }
          } else {
            toast.error("Server error or no response.");
          }
        }
      };

  return (
    <div>
      <h1>Forgot Password</h1>
      {!otpSent ? (
        <>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className={styles.submitBtn} onClick={handleSendOtp}>
            Send OTP
          </button>
        </>
      ) : (
        <OTPForm email={email} setState={setState} />
      )}

      <p className={styles.switchLink}>
        Back to <span onClick={() => setState("Login")}>Login</span>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
