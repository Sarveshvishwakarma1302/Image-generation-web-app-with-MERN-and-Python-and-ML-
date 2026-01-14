import React from "react";
import { stepsData } from "../../assets/assets";
import styles from "./Steps.module.css";

const Steps = () => {
  return (
    <div className={styles.stepsContainer}>
      <h1>How It's Work</h1>
      <p>Transform Word into stunning images</p>

      <div className={styles.stepsGrid}>
        {stepsData.map((item, index) => (
          <div className={styles.stepBox} key={index}>
            <img src={item.icon} alt="step icon" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;