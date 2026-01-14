// import React, { useContext, useEffect, useState } from "react";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import styles from "./Login.module.css";

// const Login = ({ onClose }) => {
//   const [state, setState] = useState("Login"); // 'Login' | 'signUp' | 'forgotPassword'
//   const { setShowLogin, setToken, setUser } = useContext(AppContext);

//   // Common fields
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");

//   // Forgot password flow
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, []);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       if (state === "Login") {
//         const { data } = await axios.post("http://localhost:4000/user/login", {
//           email,
//           password,
//         });

//         if (data.success) {
//           setToken(data.token);
//           setUser(data.user);
//           localStorage.setItem("token", data.token);
//           setShowLogin(false);
//         } else {
//           toast.error(data.message);
//         }
//       } else if (state === "signUp") {
//         const { data } = await axios.post(
//           "http://localhost:4000/user/register",
//           {
//             username,
//             email,
//             password,
//           }
//         );

//         if (data.success) {
//           setToken(data.token);
//           setUser(data.user);
//           localStorage.setItem("token", data.token);
//           setShowLogin(false);
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleSendOtp = async () => {
//     try {
//       const { data } = await axios.post("http://localhost:4000/user/send-otp", {
//         email,
//       });

//       if (data.success) {
//         setOtpSent(true);
//         toast.success("OTP sent to your email.");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     try {
//       // 1. Verify OTP
//       const verifyRes = await axios.post(
//         "http://localhost:4000/user/verify-otp",
//         { email, otp }
//       );

//       if (!verifyRes.data.success) {
//         toast.error(verifyRes.data.message || "Invalid OTP");
//         return;
//       }

//       // 2. Reset Password
//       const resetRes = await axios.post(
//         "http://localhost:4000/user/reset-password",
//         { email, newPassword }
//       );

//       if (resetRes.data.success) {
//         toast.success("Password reset successful. Please login.");
//         setState("Login");
//         setOtp("");
//         setNewPassword("");
//         setConfirmPassword("");
//         setOtpSent(false);
//       } else {
//         toast.error(resetRes.data.message || "Reset failed.");
//       }
//     } catch (err) {
//       toast.error("Failed to reset password.");
//     }
//   };

//   return (
//     <div className={styles.loginOverlay}>
//       <div className={styles.blurBackground} onClick={onClose}></div>

//       <form
//         className={styles.loginForm}
//         onSubmit={state === "forgotPassword" ? undefined : onSubmitHandler}
//       >
//         <img
//           src={assets.cross_icon}
//           alt="Close"
//           className={styles.closeIcon}
//           onClick={() => setShowLogin(false)}
//         />

//         <h1>
//           {state === "Login"
//             ? "Login"
//             : state === "signUp"
//             ? "Create Account"
//             : "Forgot Password"}
//         </h1>

//         {state === "Login" && (
//           <p className={styles.subtitle}>
//             Welcome back! Please login to continue.
//           </p>
//         )}

//         {/* Sign Up - Full Name */}
//         {state === "signUp" && (
//           <div className={styles.inputGroup}>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         {/* Email */}
//         {(state === "Login" || state === "signUp") && (
//           <div className={styles.inputGroup}>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         {/* Password */}
//         {(state === "Login" || state === "signUp") && (
//           <div className={styles.inputGroup}>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         {/* Forgot Password */}
//         {state === "Login" && (
//           <p
//             className={styles.forgot}
//             onClick={() => {
//               setState("forgotPassword");
//               setOtpSent(false);
//             }}
//           >
//             Forgot Password?
//           </p>
//         )}

//         {(state === "Login" || state === "signUp") && (
//           <button type="submit" className={styles.submitBtn}>
//             {state === "Login" ? "Login" : "Create Account"}
//           </button>
//         )}

//         {state === "Login" ? (
//           <p className={styles.switchLink}>
//             Don't have an account?{" "}
//             <span onClick={() => setState("signUp")}>Sign Up</span>
//           </p>
//         ) : state === "signUp" ? (
//           <p className={styles.switchLink}>
//             Already have an account?{" "}
//             <span onClick={() => setState("Login")}>Login</span>
//           </p>
//         ) : null}

//         {/* Forgot Password Flow */}
//         {state === "forgotPassword" && (
//           <>
//             {!otpSent ? (
//               <>
//                 <div className={styles.inputGroup}>
//                   <input
//                     type="email"
//                     placeholder="Enter your registered email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className={styles.submitBtn}
//                   onClick={handleSendOtp}
//                 >
//                   Send OTP
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className={styles.inputGroup}>
//                   <input
//                     type="text"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className={styles.inputGroup}>
//                   <input
//                     type="password"
//                     placeholder="New Password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className={styles.inputGroup}>
//                   <input
//                     type="password"
//                     placeholder="Confirm New Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className={styles.submitBtn}
//                   onClick={handleResetPassword}
//                 >
//                   Reset Password
//                 </button>
//               </>
//             )}
//             <p className={styles.switchLink}>
//               Back to <span onClick={() => setState("Login")}>Login</span>
//             </p>
//           </>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useContext, useState } from "react";
import styles from "./login.module.css";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const Login = ({ onClose }) => {
  const [state, setState] = useState("Login"); // 'Login' | 'signUp' | 'forgotPassword'
  const { setShowLogin } = useContext(AppContext);


  return (
    <div className={styles.loginOverlay}>
      <div className={styles.blurBackground} onClick={onClose}></div>

      <div className={styles.loginForm}>
        <img
          src={assets.cross_icon}
          alt="Close"
          className={styles.closeIcon}
          onClick={() => setShowLogin(false)}
        />

        {state === "Login" && <LoginForm setState={setState} />}
        {state === "signUp" && <SignUpForm setState={setState} />}
        {state === "forgotPassword" && <ForgotPasswordForm setState={setState} />}
      </div>
    </div>
  );
};

export default Login;
