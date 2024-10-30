import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { incrementCategoryMark, isIqTest } from "../../features/IqMarksSlice";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
          dataArray.push(doc.data());
        });
        setQuestionsData(dataArray);

        if (questionsFromFirebase.empty) {
          console.log("No documents found in the collection.");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

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
      // Replace btnText with test
      if (test === "iqQuestionsData") {
        if (item.selected === item.answer) {
          dispatch(incrementCategoryMark({ category: item.type }));
        }
        dispatch(isIqTest(true));
        dispatch(isRaisecTest(false));
      } else if (test === "raisecQuestionsData") {
        if (item.selected === item.answer) {
          dispatch(incrementRaisecMark({ category: item.type }));
        }
        dispatch(isRaisecTest(true));
        dispatch(isIqTest(false));
      }
    });
  };
  return (
    <div>
      {test ? (
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

export default QuizComponent;
