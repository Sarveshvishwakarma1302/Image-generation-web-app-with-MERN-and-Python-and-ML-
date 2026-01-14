import React from "react";
import { assets } from "../../assets/assets";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      {/* Left Side: Logo + Text */}
      <div className={styles.footerLeft}>
        <button className={styles.navImage}>Anshavtar</button>
        <p>CopyRight @Anshavtar.in | All Rights Reserved</p>
      </div>

      {/* Right Side: Social Icons */}
      <div className={styles.footerRight}>
        <img src={assets.facebook_icon} alt="Facebook" />
        <img src={assets.instagram_icon} alt="Instagram" />
        <img src={assets.twitter_icon} alt="Twitter" />
      </div>
    </div>
  );
};

export default Footer;