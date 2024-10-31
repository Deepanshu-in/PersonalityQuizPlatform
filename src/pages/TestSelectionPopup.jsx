import React from "react";
import Lottie from "react-lottie";
import testAnimation from "../assets/testSelectionAnimation.json";
import programsList from "../components/Assets/data";
const TestSelectionPopup = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: testAnimation,
    renderer: "svg",
  };
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-6 mt-24">
        <h1 className="font-cursive text-3xl">
          Which type of test would you like to have ?
        </h1>

        <div className="flex mt-10 flex-col justify-between gap-6 items-center">
          {programsList.map((item) => {
            return (
              <a
                href={item.link}
                className="flex justify-center items-center gap-2 border rounded-xl p-2 my-2 w-[250px] h-[60px] hover:bg-[#AE7DD8] border-[#6a3da5] text-[#ffffff] bg-[#6a3da5] cursor-pointer"
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
      <div>
        <Lottie options={defaultOptions} height={500} width={400} />
      </div>
    </div>
  );
};
export default TestSelectionPopup;
