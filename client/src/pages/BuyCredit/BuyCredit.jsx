import React, { useContext } from "react";
import { assets, plans } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import "./BuyCredit.css";

const BuyCredit = () => {
  const { user } = useContext(AppContext);
  const backgrounds = [
  'linear-gradient(135deg, #efa2e7ff, #c9f882ff)',   
  'linear-gradient(135deg, #EEAECA, #94BBE9)',   
  'linear-gradient(135deg,  #76b7c0ff, #d4e048ff)',   
];

  return (
    <div className="buy-credit-container">
      <button className="plans-button">Our plans</button>
      <h1>Choose the Plan</h1>

      <div className="plan-list">
        {plans.map((item, index) => (
          <div
  className="plan-card"
  key={index}
  style={{ background: backgrounds[index % backgrounds.length] }}>
            <img src={assets.logo_icon} alt="Plan Icon" />
            <p className="priceId">{item.id}</p>
            <p>{item.desc}</p>
            <p>
              <span className="price">$ {item.price}</span> / {item.credits} Credit
            </p>
            <button className="purchase">{user ? "Purchase" : "Get Started"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;