import { useSelector } from "react-redux";
import { useState } from "react";
import MainSection from "../../pages/MainSection";
import QuizComponent from "../QuizComponents/QuizComponent";
import { Link, useSearchParams } from "react-router-dom";

const Hero = () => {
  const [testType, setTestType] = useState("");
  const [btnText, setBtnText] = useState("");

  const handleButtonClick = (type) => {
    setTestType(type); // This will be passed to QuizComponent
    setBtnText(type); // This handles the button active state
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <MainSection />
      <div>
        <h1 className="font-semibold text-5xl items-center justify-center text-[#FF8400]">
          Ready to Measure Your IQ and EQ?
        </h1>
      </div>
      <div className="flex flex-row gap-6">
        <Link to="/iqTest?type=iqQuestions">
          <button
            className={
              btnText === "iqQuestionsData"
                ? "btn btn-selected bg-[#FF8400] px-8"
                : "btn btn-outline hover:bg-[#FF8400] px-8"
            }
            onClick={() => handleButtonClick("iqQuestionsData")}
          >
            IQ TEST
          </button>
        </Link>
        <Link to="/eqTest?type=raisecQuestions">
          <button
            className={
              btnText === "raisecQuestionsData"
                ? "btn btn-selected bg-[#FF8400] px-8"
                : "btn btn-outline hover:bg-[#FF8400] px-8"
            }
            onClick={() => handleButtonClick("raisecQuestionsData")}
          >
            RAISEC TEST
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
