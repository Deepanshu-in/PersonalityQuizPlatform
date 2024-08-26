import React from "react";
import Lottie from "react-lottie";
import testAnimation from "../assets/testSelectionAnimation.json";

const TestSelectionPopup = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: testAnimation,
    renderer: "svg",
  };
  return (
    <div className="flex items-start justify-between">
      <div className="mt-16">
        <h1 className="font-cursive text-3xl">
          Which type of test would you like to have ?
        </h1>
      </div>
      <div>
        <Lottie options={defaultOptions} height={500} width={400} />
      </div>
    </div>
  );
};

export default TestSelectionPopup;
