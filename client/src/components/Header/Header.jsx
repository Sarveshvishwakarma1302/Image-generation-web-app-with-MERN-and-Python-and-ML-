import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

import sampleImg4 from "../../assets/sample_img_4.png";
import sampleImg5 from "../../assets/sample_img_5.png";
import sampleImg6 from "../../assets/sample_img_6.png";

import styles from "./Header.module.css";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [focusMap, setFocusMap] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  // Image List for scrolling
  const images = Array(15).fill(null).map((_, i) => {
    if (i % 3 === 0) return sampleImg4;
    if (i % 3 === 1) return sampleImg5;
    return sampleImg6;
  });

  //  Auto Scroll Effect (Stops on Hover)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let speed = 1.5;
    let raf;

    const scroll = () => {
      if (!isHovered) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
        detectFocus();
      }
      raf = requestAnimationFrame(scroll);
    };

    const detectFocus = () => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const items = container.querySelectorAll(`.${styles.carouselItem}`);
      const updatedFocus = {};

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - itemCenter);
        const maxDistance = containerRect.width / 2;
        const focus = Math.max(0, 1 - distance / maxDistance);
        updatedFocus[index] = focus;
      });

      setFocusMap(updatedFocus);
    };

    scroll();
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  // Multi-color glow colors
  const colors = [
    "255,0,0",    
    "0,255,0",    
    "0,0,255",    
    "255,255,0",  
    "255,0,255",  
    "0,255,255",  
  ];

  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.mainHeading}>Change Text To Image</h1>
      <p className={styles.description}>
        Smooth transitions — glowing on enter, clean and sharp throughout.
      </p>

      <button
        onClick={() => (user ? navigate("/Result") : setShowLogin(true))}
        className={styles.generateButton}
      >
        Generate Images
        <img src={assets.star_group} alt="star-group" className={styles.buttonIcon} />
      </button>

      {/*  Carousel Container */}
      <div className={styles.carouselContainer} ref={scrollRef}>
        <div className={styles.carouselTrack}>
          {images.map((img, index) => {
            const focus = focusMap[index] || 0;
            const scale = 0.9 + 0.2 * focus;
            const opacity = 0.5 + 0.5 * focus;
            const glow = focus;
            const color = colors[index % colors.length];

            return (
              <div
                key={index}
                className={styles.carouselItem}
                style={{
                  transform: `scale(${scale})`,
                  opacity: opacity,
                  boxShadow: `0 0 ${40 * glow}px rgba(${color}, ${glow})`,
                  zIndex: Math.floor(focus * 100),
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={img}
                  alt={`img-${index}`}
                  className={styles.carouselImage}
                />
              </div>
            );
          })}
        </div>
      </div>

      <h3 className={styles.footerText}>Generated Images From Anshavtar</h3>
    </div>
  );
};

export default Header;
