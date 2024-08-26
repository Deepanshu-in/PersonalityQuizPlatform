import React from "react";
import { incrementCategoryMark, isIqTest } from "../../features/IqMarksSlice";
import { useDispatch, useSelector } from "react-redux";

const IqQuizComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  return <div>IqQuizComponent</div>;
};

export default IqQuizComponent;
