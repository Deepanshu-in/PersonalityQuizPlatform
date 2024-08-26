import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementCategoryMark, isIqTest } from "../../features/IqMarksSlice";
import {
  incrementRaisecMark,
  isRaisecTest,
} from "../../features/raisecMarksSlice";
import { app } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDocs,
} from "firebase/firestore";
import MainSection from "../../pages/MainSection";

const Hero = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  // const [testType, setTestType] = useState("");
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [selectedOption, setSelectedOption] = useState(null);
  // const [btnText, setBtnType] = useState("");
  // const [isSub, setIsSub] = useState(false);
  const firestore = getFirestore(app);
  const user = useSelector((state) => state.auth);
  // const [QuestionsData, setQuestionsData] = useState([]);

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, QuestionsData.length - 1)
    );
    setSelectedOption(null);
  };

  const prevQuestion = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setSelectedOption(null);
  };

  const optionHandler = (optionIndex) => {
    setSelectedOption(optionIndex);
    const updatedQuestionsData = QuestionsData.map((question, index) => {
      if (index === currentIndex) {
        return {
          ...question,
          selected: question.options[optionIndex],
        };
      }
      return question;
    });
    setQuestionsData(updatedQuestionsData);
  };
  const onSubmit = () => {
    setIsSub(true);
    console.log(QuestionsData);
    QuestionsData.forEach((item) => {
      if (btnText === "iqQuestionsData") {
        if (item.selected === item.answer) {
          dispatch(incrementCategoryMark({ category: item.type }));
        }
        dispatch(isIqTest(true));
        dispatch(isRaisecTest(false));
      } else if (btnText === "raisecQuestionsData") {
        if (item.selected === item.answer) {
          dispatch(incrementRaisecMark({ category: item.type }));
        }
        dispatch(isRaisecTest(true));
        dispatch(isIqTest(false));
      }
    });
  };

  const btnHandler = async (type) => {
    setTestType(type);
    setBtnType(type);
    setCurrentIndex(0);
    setSelectedOption(null);
    if (type === "iqQuestionsData") {
      setLoading(true);
      const collectionRef = collection(
        firestore,
        "questions/Tgbu1GYG9nsZ7a71lONU/iqQuestions/7ak13hbI5Wz8IZn37BOO/set1"
      );

      try {
        const iqQuestionsFromFirebase = await getDocs(collectionRef);
        const dataA = [];
        iqQuestionsFromFirebase.forEach((doc) => {
          dataA.push(doc.data());
        });
        setQuestionsData(dataA);
        if (iqQuestionsFromFirebase.empty) {
          console.log("No documents found in the collection.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    } else {
      setLoading(true);
      const collectionRef = collection(
        firestore,
        "questions/Tgbu1GYG9nsZ7a71lONU/raisecQuestions"
      );

      try {
        const raisecQuestionsFromFirebase = await getDocs(collectionRef);
        const dataArray = [];
        raisecQuestionsFromFirebase.forEach((doc) => {
          dataArray.push(doc.data());
        });
        setQuestionsData(dataArray);
        if (raisecQuestionsFromFirebase.empty) {
          console.log("No documents found in the collection.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }
  };
  return (
    <div className="flex flex-col items-center gap-10">
      <MainSection />
      <div>
        <h1 className="font-semibold text-5xl items-center justify-center text-[#FF8400]">
          Ready to Measure Your IQ and EQ ?
        </h1>
      </div>
      <div className="flex flex-row gap-6">
        <button
          className={
            btnText === "iqQuestionsData"
              ? "btn btn-selected bg-[#FF8400] px-8"
              : "btn btn-outline hover:bg-[#FF8400] px-8"
          }
          onClick={() => btnHandler("iqQuestionsData")}
        >
          IQ TEST
        </button>
        <button
          className={
            btnText === "raisecQuestionsData"
              ? "btn btn-selected bg-[#FF8400] px-8"
              : "btn btn-outline hover:bg-[#FF8400] px-8"
          }
          onClick={() => btnHandler("raisecQuestionsData")}
        >
          RAISEC TEST
        </button>
      </div>

      {testType ? (
        user ? (
          loading ? (
            <div>loading...</div>
          ) : (
            <div className="mt-10 border border-[#FF8400] rounded-lg h-auto w-[900px] mb-10">
              <div className="p-4 flex flex-col gap-8 mt-10">
                <div className="border border-black rounded-md flex flex-col gap-2 p-4 font-semibold h-[400px] w-[860px] overflow-auto">
                  <div className="flex flex-row">
                    <h1>{`Q${currentIndex + 1}. `}</h1>
                    {QuestionsData[currentIndex].question ? (
                      <h1>{QuestionsData[currentIndex].question}</h1>
                    ) : (
                      <img
                        src={QuestionsData[currentIndex].questionImg}
                        alt="Question Image"
                        className="h-[350px] w-[750px]"
                      />
                    )}
                  </div>
                  <div className="mx-2">
                    {QuestionsData[currentIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className="flex flex-row gap-1 items-center"
                        >
                          <div className="form-control">
                            <label className="cursor-pointer label">
                              <input
                                type="radio"
                                className="radio radio-accent"
                                onChange={() => optionHandler(index)}
                                checked={selectedOption === index}
                              />
                            </label>
                          </div>
                          {option}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <button
                    className="btn btn-outline bg-[#FF8400] px-4"
                    onClick={prevQuestion}
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </button>
                  {currentIndex === QuestionsData.length - 1 && (
                    <button className="btn btn-success" onClick={onSubmit}>
                      SUBMIT
                    </button>
                  )}
                  <button
                    className="btn btn-outline bg-[#FF8400] px-4"
                    onClick={nextQuestion}
                    disabled={currentIndex === QuestionsData.length - 1}
                  >
                    Next
                  </button>
                </div>
                {isSub ? (
                  <Link to={`/result/${user}`}>
                    <button className="btn btn-outline bg-[#FF8400] px-4 w-[860px] items-center">
                      Go To Results
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          )
        ) : (
          <div>Signin/Signup first to access the test !!</div>
        )
      ) : null}
    </div>
  );
};

export default Hero;
