import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./login.module.css";
import AuthHeader from "./AuthHeader";

const LoginForm = ({ setState }) => {
  const { setToken, setUser, setShowLogin } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keeploggedin, setKeepLoggedIn] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });
      console.log("Login API Response:", data);
      if (data.success && data.accessToken) {
  setToken(data.accessToken);
  setUser(data.user);
  localStorage.setItem("token", data.accessToken);
  localStorage .setItem("keeploggedin",JSON.stringify(true));
  setShowLogin(false);
} else {
      // 💡 अगर बैकएंड से error message आए
      if (data.errors) {
        Object.values(data.errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error(data.message || "Login failed");
      }
    }
  } catch (err) {
    // 💥 Axios error को सही से हैंडल करें
    if (err.response && err.response.data) {
      const data = err.response.data;
      if (data.errors) {
        Object.values(data.errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error(data.message || "Login failed");
      }
    } else {
      toast.error("Server error or no response.");
    }
  }
};

  return (
    <form onSubmit={handleLogin}>
      <AuthHeader
        title="Login"
        subtitle="Welcome back! Please login to continue."
      />

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

      <p className={styles.forgot} onClick={() => setState("forgotPassword")}>
        Forgot Password?
      </p>

      <button type="submit" className={styles.submitBtn}>
        Login
      </button>

      <p className={styles.switchLink}>
        Don't have an account? <span onClick={() => setState("signUp")}>Sign Up</span>
      </p>
    </form>
  );
};

export default LoginForm;
