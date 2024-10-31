// src/Quiz.js

import React, { useState } from "react";

const questions = [
  {
    question: "Which of the following correctly describes fragments in React?",
    options: [
      "A fragment is a means of running side effect code.",
      "A fragment is a means of wrapping up a set of elements with a container element.",
      "A fragment is a means of injecting a DocumentFragment instance into the DOM.",
    ],
    answer: 1, // index of the correct answer
  },

  {
    question: "Which of the following correctly describes fragments in React?",
    options: [
      "A fragment is a means of running side effect code.",
      "A fragment is a means of wrapping up a set of elements with a container element.",
      "A fragment is a means of injecting a DocumentFragment instance into the DOM.",
    ],
    answer: 2, // index of the correct answer
  },
  {
    question: "Which of the following correctly describes fragments in React?",
    options: [
      "A fragment is a means of running side effect code.",
      "A fragment is a means of wrapping up a set of elements with a container element.",
      "A fragment is a means of injecting a DocumentFragment instance into the DOM.",
    ],
    answer: 3, // index of the correct answer
  },
  // Add more questions as desired
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const isCorrect =
        selectedOption === questions[currentQuestionIndex].answer;
      setResults([
        ...results,
        { question: questions[currentQuestionIndex].question, isCorrect },
      ]);
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      {!isQuizStarted ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Are you ready?</h1>
          <p className="mb-4">9 questions to solve</p>
          <p className="mb-6">
            This quiz goes to full-screen once you press the Start button.
          </p>
          <button
            onClick={handleStartQuiz}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Start Quiz →
          </button>
        </div>
      ) : (
        <div>
          {currentQuestionIndex < questions.length ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Q{currentQuestionIndex + 1}.{" "}
                {questions[currentQuestionIndex].question}
              </h2>
              <div className="mb-4">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="quiz-option"
                        checked={selectedOption === index}
                        onChange={() => handleOptionSelect(index)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className={`cursor-pointer p-2 rounded ${
                          selectedOption === index ? "bg-gray-300" : "bg-white"
                        }`}
                      >
                        {option}
                      </label>
                    </div>
                  )
                )}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() =>
                    setCurrentQuestionIndex(currentQuestionIndex - 1)
                  }
                  disabled={currentQuestionIndex === 0}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              <ul>
                {results.map((result, index) => (
                  <li
                    key={index}
                    className={`mb-2 ${
                      result.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.question} - {result.isCorrect ? "Correct" : "Wrong"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
