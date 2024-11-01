import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCategoryMark,
  isIqTest,
  totalMarksIq,
} from "../../features/IqMarksSlice";
import Lottie from "react-lottie";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingAnimation from "../../assets/loadingAnimation.json";
import {
  incrementRaisecMark,
  isRaisecTest,
  totalMarksEq,
} from "../../features/raisecMarksSlice";
import { app } from "../../firebase/firebase";
import { collection, getFirestore, getDocs } from "firebase/firestore";

const QuizComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [QuestionsData, setQuestionsData] = useState([]);
  const [isSub, setIsSub] = useState(false);

  const firestore = getFirestore(app);
  const user = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const dropAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    renderer: "svg",
  };

  const notify = () =>
    toast("Getting Things Ready For You...", {
      position: "top-center",
      autoClose: 3200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    const type = searchParams.get("type");
    const fetchQuestions = async () => {
      setTest(type);
      setCurrentIndex(0);
      setSelectedOption(null);
      setLoading(true);
      let collectionRef;
      if (type === "raisecQuestions") {
        collectionRef = collection(
          firestore,
          "questions/Tgbu1GYG9nsZ7a71lONU/raisecQuestions"
        );
      } else {
        collectionRef = collection(
          firestore,
          "questions/Tgbu1GYG9nsZ7a71lONU/iqQuestions/7ak13hbI5Wz8IZn37BOO/set1"
        );
      }
      try {
        const questionsFromFirebase = await getDocs(collectionRef);
        const dataArray = [];
        questionsFromFirebase.forEach((doc) => {
          dataArray.push({ ...doc.data(), selected: null }); // Initialize `selected` to null
        });
        setQuestionsData(dataArray);

        if (questionsFromFirebase.empty) {
          console.log("No documents found in the collection.");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setTimeout(() => setLoading(false), 10);
      }
    };
    notify();
    fetchQuestions();
  }, []);

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = Math.min(prevIndex + 1, QuestionsData.length - 1);
      setSelectedOption(
        QuestionsData[nextIndex].selected !== undefined
          ? QuestionsData[nextIndex].selected
          : null
      );
      return nextIndex;
    });
  };

  const prevQuestion = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = Math.max(prevIndex - 1, 0);
      setSelectedOption(
        QuestionsData[prevIndexNew].selected !== undefined
          ? QuestionsData[prevIndexNew].selected
          : null
      );
      return prevIndexNew;
    });
  };

  const optionHandler = (optionIndex) => {
    setSelectedOption(optionIndex);
    const updatedQuestionsData = QuestionsData.map((question, index) => {
      if (index === currentIndex) {
        return {
          ...question,
          selected: optionIndex,
        };
      }
      return question;
    });
    setQuestionsData(updatedQuestionsData);
    // console.log(QuestionsData);
  };

  const onSubmit = () => {
    setIsSub(true);
    QuestionsData.forEach((item) => {
      if (test === "raisecQuestions") {
        if (item.options[item.selected] === item.answer) {
          dispatch(incrementRaisecMark({ category: item.type }));
          dispatch(totalMarksEq());
        }
        dispatch(isRaisecTest(true));
        dispatch(isIqTest(false));
      } else {
        if (item.options[item.selected] === item.answer) {
          dispatch(incrementCategoryMark({ category: item.type }));
          dispatch(totalMarksIq());
        }
        dispatch(isIqTest(true));
        dispatch(isRaisecTest(false));
      }
    });
  };

  return (
    <div>
      {test ? (
        user ? (
          loading ? (
            <div className="flex flex-col justify-center items-center">
              <Lottie options={dropAnimationOptions} height={700} width={700} />
            </div>
          ) : (
            <div className="mt-10 mx-auto border-[1.5px] border-[#6a3da5] rounded-lg h-auto w-[900px] mb-10">
              <div className="p-4 flex flex-col gap-8 mt-10">
                <div className="flex flex-col gap-2 p-4 font-semibold h-[400px] w-[860px] overflow-auto">
                  <div
                    className={`flex items-start ${
                      QuestionsData[currentIndex].questionImg
                        ? "flex-col"
                        : "flex-row"
                    }`}
                  >
                    <h1 className="font-bold text-[16px]">{`Q${
                      currentIndex + 1
                    }. `}</h1>
                    <div className="flex flex-col items-center justify-center">
                      {QuestionsData[currentIndex].question ? (
                        <div className="px-2">
                          <h1 className="leading-6 font-bold text-[16px]">
                            {QuestionsData[currentIndex].question}
                          </h1>
                        </div>
                      ) : (
                        <img
                          src={QuestionsData[currentIndex].questionImg}
                          alt="Question Image"
                          className="h-[350px] w-[750px] border border-black rounded-sm py-4 px-2 mx-1 mt-1"
                        />
                      )}
                    </div>
                  </div>

                  <div className="w-[900px] mt-10">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Options
                    </h3>
                    {QuestionsData[currentIndex].options.map(
                      (option, index) => (
                        <div key={index}>
                          <div className="form-control">
                            <label
                              className={` flex flex-row m-2 gap-2 py-4 px-2   hover:border-[#6a3da5] hover:border-2 hover:transition-all hover:duration-400 justify-start cursor-pointer label w-[800px]  rounded-md 
            ${
              selectedOption === index
                ? "bg-[#6a3da5] text-white border border-white"
                : "bg-white text-black border border-black "
            }`}
                              onClick={() => optionHandler(index)}
                            >
                              <div className="ml-4">{option}</div>
                            </label>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <button
                    className="relative inline-block px-8 py-2 font-medium group"
                    onClick={prevQuestion}
                    disabled={currentIndex === 0}
                  >
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6a3da5] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#6a3da5] group-hover:bg-[#6a3da5]"></span>
                    <span className="relative text-[#6a3da5] group-hover:text-white">
                      Previous
                    </span>
                  </button>
                  {currentIndex === QuestionsData.length - 1 && (
                    <button
                      className="relative inline-block px-8 py-2 font-medium group"
                      onClick={onSubmit}
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6a3da5] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#6a3da5] group-hover:bg-[#6a3da5]"></span>
                      <span className="relative text-[#6a3da5] group-hover:text-white">
                        Submit
                      </span>
                    </button>
                  )}
                  <div className="flex justify-center">
                    <button
                      className="relative inline-block px-10 py-2 font-medium group"
                      onClick={nextQuestion}
                      disabled={currentIndex === QuestionsData.length - 1}
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6a3da5] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#6a3da5] group-hover:bg-[#6a3da5]"></span>
                      <span className="relative text-[#6a3da5] group-hover:text-white">
                        Next
                      </span>
                    </button>
                  </div>
                </div>
                {isSub ? (
                  <Link to={`/result/${user}`}>
                    <div className="flex justify-center">
                      <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-[#003B46] p-4 px-5 py-2.5 font-medium text-[#C4DFE6] shadow-md transition duration-300 ease-out w-[860px]">
                        <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#003B46] text-white duration-300 group-hover:translate-x-0">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </span>
                        <span className="absolute flex h-full w-full transform items-center justify-center text-[#003B46] transition-all duration-300 group-hover:translate-x-full">
                          Go To Results
                        </span>
                        <span className="invisible relative">
                          Go To Results
                        </span>
                      </button>
                    </div>
                  </Link>
                ) : null}
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1>Login to Continue</h1>
            <Lottie options={dropAnimationOptions} height={700} width={700} />
          </div>
        )
      ) : null}
    </div>
  );
};

export default QuizComponent;
