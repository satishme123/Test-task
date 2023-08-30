import { gsap } from "gsap";
import React from "react";
import MainContent from "./MainContent";

const Home = () => {
  let timeline = gsap.timeline();

  return (
    <div>
      <MainContent timeline={timeline} />
    </div>
  );
};

export default Home;
