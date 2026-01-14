import React from "react";
import styles from "./Description.module.css";

const Description = () => {
  return (
    <div className={styles.descriptionContainer}>
      <h1 className={styles.descriptionTitle}>Create AI Images</h1>

      <div className={styles.descriptionBox}>
        <div className={styles.descriptionImage}>
          <div className={styles.sliderImage}></div>
        </div>

        <div className={styles.descriptionContent}>
          <h2>Introducing AI-Powered Text to Image Generator</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
            perspiciatis, vel neque atque magnam ad ipsum tempora eaque nam
            quia reiciendis cumque amet distinctio corrupti deleniti voluptatem
            magni inventore voluptate nobis, hic minima dignissimos modi...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
