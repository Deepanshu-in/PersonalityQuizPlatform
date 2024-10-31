import { useState } from "react";
import MainSection from "../../pages/MainSection";
import { Link } from "react-router-dom";
import CustomPopup from "../../features/CustomPopup";
const Hero = () => {
  const [btnText, setBtnText] = useState("");

  const handleButtonClick = (type) => {
    setBtnText(type);
  };
  const [visibility, setVisibility] = useState(false);
  const [Testvisibility, setTestVisibility] = useState(false);

  return (
    <>
      {/* popup to notify to open desktop */}
      <div className="lg:hidden w-[300px]">
        <CustomPopup show={true} title="Open in Desktop">
          Sorry But this test requires Desktop Browser
        </CustomPopup>
      </div>

      <div className="max-lg:hidden flex flex-col items-center gap-10">
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
    </>
  );
};

export default Hero;
