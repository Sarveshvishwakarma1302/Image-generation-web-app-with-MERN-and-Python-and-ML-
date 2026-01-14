import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthHeader from "./AuthHeader";

const SignUpForm = ({ setState }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/user/register", {
        username,
        email,
        password,
      });

      if (data.success) {
        toast.success("Registration successful! Please verify your email.");
        navigate(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
      // 💡 अगर बैकएंड से error message आए
      if (data.errors) {
        Object.values(data.errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error(data.message || "Registered failed");
      }
    }
  } catch (err) {
    // 💥 Axios error को सही से हैंडल करें
    if (err.response && err.response.data) {
      const data = err.response.data;
      if (data.errors) {
        Object.values(data.errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error(data.message || "Registered failed");
      }
    } else {
      toast.error("Server error or no response.");
    }
  }
};

  return (
    <form onSubmit={handleSignUp}>
      <AuthHeader title="Create Account" />

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Create Account
      </button>

      <p className={styles.switchLink}>
        Already have an account?{" "}
        <span onClick={() => setState("Login")}>Login</span>
      </p>
    </form>
  );
};

export default SignUpForm;
