import React from "react";
import styles from "./login.module.css";

const AuthHeader = ({ title, subtitle }) => (
  <>
    <h1>{title}</h1>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </>
);

export default AuthHeader;
