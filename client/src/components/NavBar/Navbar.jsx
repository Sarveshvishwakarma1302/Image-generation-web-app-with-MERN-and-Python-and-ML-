import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user, credits, setShowLogin, logout, loadingUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && user && credits <= 0) {
      navigate("/BuyCredit");
    }
  }, [user, credits, navigate, loadingUser]);

  if (loadingUser) return null; 

  console.log("User in NavBar:", user);
  console.log("Credits in NavBar:", credits);

  return (
    <div className={styles.navContainer}>
      <Link to="/">
        <button className={styles.navImage}>Anshavtar</button>
      </Link>

      <div>
        {user ? (
          <div className={styles.userContainer}>
            <button
              onClick={() => navigate("/BuyCredit")}
              className={styles.creditButton}
            >
              <img
                src={assets.credit_star}
                alt="Credit Icon"
                className={styles.creditIcon}
              />
              <p>Credit Left: {credits ?? 0}</p>
            </button>

            <p className={styles.userGreeting}>Hi, {user.username}</p>

            <div className={styles.profileContainer}>
              <img
                src={assets.profile_icon}
                alt="User"
                className={styles.profileIcon}
              />
              <div className={styles.dropdown}>
                <ul>
                  <li onClick={logout}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.navLinks}>
            <p
              className={styles.pricing}
              onClick={() => navigate("/BuyCredit")}
            >
              Pricing
            </p>
            <button
              className={styles.loginButton}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
