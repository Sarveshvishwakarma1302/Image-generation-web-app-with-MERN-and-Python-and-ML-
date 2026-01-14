import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import styles from "./GenerateButton.module.css";

const GenerateButton = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/Result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>See The Magic and Try Now</h1>
      <button className={styles.generateBtn} onClick={onClickHandler}>
        Generate Image
        <img src={assets.star_group} alt="Stars" className={styles.starIcon} />
      </button>
    </div>
  );
};

export default GenerateButton;