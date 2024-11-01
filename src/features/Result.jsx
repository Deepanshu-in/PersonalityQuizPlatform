import React from "react";
import { useSelector } from "react-redux";
import ResultDetails from "../components/Result/ResultDetails";

export default function Result() {
  const categoryMarks = useSelector((state) => state.categoryMarks);
  const raisecMarks = useSelector((state) => state.raisecMarks);
  console.log(raisecMarks);
  console.log(categoryMarks);

  return (
    <div className="">
      {raisecMarks.isRais ? (
        <ResultDetails result={raisecMarks} type="EQ TEST" />
      ) : (
        <ResultDetails result={categoryMarks} type="IQ TEST" />
      )}
    </div>
  );
}
