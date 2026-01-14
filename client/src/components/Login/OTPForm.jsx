import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./login.module.css";

const OTPForm = ({ email, setState }) => {
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   OTP Verify Function
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`http://localhost:4000/user/verify-otp/${email}`, {
        otp,
      });

      if (res.data.success) {
        toast.success("OTP verified successfully.");
        setOtpVerified(true); // Show password reset fields
      } else {
            // 💡 अगर बैकएंड से error message आए
            if (data.errors) {
              Object.values(data.errors).forEach((msg) => toast.error(msg));
            } else {
              toast.error(data.message || "Invalid OTP");
            }
          }
        } catch (err) {
          // 💥 Axios error को सही से हैंडल करें
          if (err.response && err.response.data) {
            const data = err.response.data;
            if (data.errors) {
              Object.values(data.errors).forEach((msg) => toast.error(msg));
            } else {
              toast.error(data.message || "Verification Failed");
            }
          } else {
            toast.error("Server error or no response.");
          }
        }
      };

  // Password Reset Function
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:4000/user/change-password/${email}`, {
        newPassword,
        confirmPassword, // now sending both fields
      });

      if (res.data.success) {
        toast.success("Password reset successful. Please login.");
        setState("Login");
      } else {
            // 💡 अगर बैकएंड से error message आए
            if (data.errors) {
              Object.values(data.errors).forEach((msg) => toast.error(msg));
            } else {
              toast.error(data.message || "Password Reset Failed Please try again");
            }
          }
        } catch (err) {
          // 💥 Axios error को सही से हैंडल करें
          if (err.response && err.response.data) {
            const data = err.response.data;
            if (data.errors) {
              Object.values(data.errors).forEach((msg) => toast.error(msg));
            } else {
              toast.error(data.message || "Something went wrong");
            }
          } else {
            toast.error("Server error or no response.");
          }
        }
      };

  return (
    <>
      {/*  OTP Input Section */}
      {!otpVerified && (
        <>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
          </div>

          <button className={styles.submitBtn} onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </>
      )}

      {/*  Password Reset Section */}
      {otpVerified && (
        <>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.submitBtn} onClick={handleResetPassword}>
            Reset Password
          </button>
        </>
      )}
    </>
  );
};

export default OTPForm;
