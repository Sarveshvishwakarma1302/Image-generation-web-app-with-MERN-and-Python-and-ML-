import React from "react";
import { assets, testimonialsData } from "../../assets/assets";
import styles from "./Testimonial.module.css";

const Testimonial = () => {
  return (
    <div className={styles.testimonialContainer}>
      <h1>User's Review</h1>
      <p>What our users say</p>

      <div className={styles.testimonialsGrid}>
        {testimonialsData.map((testimonial, index) => (
          <div className={styles.testimonialCard} key={index}>
            <img src={testimonial.image} alt={testimonial.name} />
            <h2>{testimonial.name}</h2>
            <p className={styles.role}>{testimonial.role}</p>
            <div className={styles.testimonialStars}>
              {Array(testimonial.stars)
                .fill()
                .map((_, i) => (
                  <img key={i} src={assets.rating_star} alt="star" />
                ))}
            </div>
            <p className={styles.text}>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;