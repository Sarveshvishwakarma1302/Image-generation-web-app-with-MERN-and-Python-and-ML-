import React from "react";
import Header from "../components/Header/Header";
import Steps from "../components/Steps/Steps";
import Description from "../components/Description/Description.jsx";
import Testimonial from "../components/Testimonial/Testimonial.jsx";
import GenerateButton from "../components/GenerateButton/GenerateButton.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <GenerateButton />
    </div>
  );
};

export default Home;