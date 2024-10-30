import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lottieMainSectionAnimation.json";
import dropAnimation from "../assets/DropAnimation.json";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import CustomPopup from "../features/CustomPopup";
import MarkingPdfViewer from "./MarkingPdfViewer";
import TestSelectionPopup from "./TestSelectionPopup";
import paperCrushed from "../assets/background-crumpled-paper-sheet.jpg";

const MainSection = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };
  const dropAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: dropAnimation,
    renderer: "svg",
  };
  const [visibility, setVisibility] = useState(false);
  const [Testvisibility, setTestVisibility] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
  const popupCloseTestHandler = (e) => {
    setTestVisibility(e);
  };
  return (
    <div
      onClick={(e) => {
        if (Testvisibility) setTestVisibility(!Testvisibility);
        if (visibility) setVisibility(!visibility);
      }}
      className="relative mt-[-53px] py-12 pl-12"
    >
      <div className="relative flex flex-row justify-center gap-4 mx-6 min-h-[600px]">
        <div className="flex flex-col gap-12">
          <h1 className="font-capital font-extrabold text-[42px] mt-[40px]">
            Test Your IQ and EQ with Our Comprehensive Online Quizzes
          </h1>
          <h3 className="font-cursive text-gray-700 text-[36px]">
            Discover your strengths and areas for improvement with our
            scientifically-backed IQ and EQ tests. Start your journey towards
            self-discovery today!
          </h3>
          <div className="flex gap-4 items-center">
            <button
              className="border rounded-xl p-2 my-2 w-[250px] h-[60px] hover:bg-[#e8dbfc] border-[#6a3da5] text-[#5d2057] bg-[#EFE4FF]"
              onClick={(e) => setVisibility(!visibility)}
            >
              Explore Marking Scheme
            </button>

            <CustomPopup onClose={popupCloseHandler} show={visibility} title="">
              <MarkingPdfViewer />
            </CustomPopup>
            <button
              className="items-center gap-2 border rounded-xl p-2 my-2 w-[250px] h-[60px] hover:bg-[#AE7DD8] border-[#6a3da5] text-[#ffffff] bg-[#6a3da5] cursor-pointer"
              onClick={(e) => setTestVisibility(!Testvisibility)}
            >
              <span className="flex justify-center gap-2 items-center">
                Take Your Test
                <IoIosArrowForward />
              </span>
            </button>
            <CustomPopup
              onClose={popupCloseTestHandler}
              show={Testvisibility}
              title=""
            >
              <TestSelectionPopup />
            </CustomPopup>
          </div>
        </div>
        <div>
          <Lottie options={defaultOptions} height={500} width={600} />
        </div>
      </div>
      <Lottie options={dropAnimationOptions} height={100} width={100} />
    </div>
  );
};

export default MainSection;
