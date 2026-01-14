import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/user/verify",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (data.success) {
            setStatus("success");
            setTimeout(() => navigate("/"), 3000);
          } else {
            setStatus("error");
          }
        } catch (err) {
          setStatus("error");
        }
      };

      verifyToken();
    } else {
      setStatus("check-email");
    }
  }, [token, navigate]);

  let content;

  if (status === "loading") {
    content = <h3>Processing...</h3>;
  } else if (status === "check-email") {
    const email = searchParams.get("email");
    content = (
      <>
        <h2>Please verify your email address</h2>
        <p>We’ve sent a verification link to your email {email ? <b>{email}</b> : ""}.<br />
        Please check your inbox and click on the link to activate your account.</p>
      </>
    );
  } else if (status === "success") {
    content = (
      <>
        <h2>✅ Email verified successfully!</h2>
        <p>Redirecting you to login page...</p>
      </>
    );
  } else {
    content = (
      <>
        <h2>❌ Verification failed</h2>
        <p>The verification link is invalid or has expired.</p>
      </>
    );
  }

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>{content}</div>
    </div>
  );
};

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f8f8f8",
};

const cardStyles = {
  maxWidth: "500px",
  width: "90%",
  padding: "30px",
  borderRadius: "12px",
  background: "#fff",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export default VerifyEmail;
