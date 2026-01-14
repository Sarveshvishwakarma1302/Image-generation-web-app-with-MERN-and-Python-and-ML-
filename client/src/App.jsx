import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit/BuyCredit";
import Result from "./pages/Result/Result";
import VerifyEmail from "./pages/VerifyEmail";
import NavBar from "./components/NavBar/Navbar";
import Loader from "./components/Loader/Loader.jsx";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login.jsx";
import SignUpPage from "./components/Login/SignUpForm";
import { ToastContainer } from "react-toastify";

import { AppContext } from "./context/AppContext";

const App = () => {
  const { showLogin, loadingApp } = useContext(AppContext);

  if (loadingApp) {
    return <Loader />;
  }

  return (
    <div className="custom-main">
      <ToastContainer position="bottom-right" />
      
      <NavBar />

      {showLogin && <Login />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BuyCredit" element={<BuyCredit />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
