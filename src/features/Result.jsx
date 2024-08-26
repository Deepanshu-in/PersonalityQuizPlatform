import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateStudentInfo } from "./studentInfoSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import formImg from "../components/Assets/formBackground.png";

export default function Result() {
  const firestore = getFirestore(app);
  const isNewUser = useSelector((state) => state.auth);
  const studentInformation = useSelector((state) => state.studentInfo);
  const dispatch = useDispatch();
  const [isEntered, setisEntered] = useState(false);
  const categoryMarks = useSelector((state) => state.categoryMarks);
  const raisecMarks = useSelector((state) => state.raisecMarks);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const age = formData.get("age");
    const state = formData.get("state");
    const phone = formData.get("phone");

    dispatch(updateStudentInfo({ field: "age", value: age }));
    dispatch(updateStudentInfo({ field: "state", value: state }));
    dispatch(updateStudentInfo({ field: "phone", value: phone }));

    e.target.reset();
    setisEntered(true);

    //if new user signed up then sending the data to firebase users
    if (isNewUser) {
      await addDoc(collection(firestore, "users"), {
        name: studentInformation.name,
        email: studentInformation.email,
        age: age,
        state: state,
        phone: phone,
      });
    }
  };
  const dataMarks = [
    {
      section: "Logical Reasoning",
      total: 8,
      obtained: categoryMarks.LogicalReasoning,
    },
    { section: "Verbal", total: 9, obtained: categoryMarks.Verbal },
    {
      section: "Numerical Ability",
      total: 9,
      obtained: categoryMarks.NumericalAbility,
    },
    { section: "Leadership", total: 3, obtained: categoryMarks.Leadership },
    {
      section: "Decision Making",
      total: 5,
      obtained: categoryMarks.DecisionMaking,
    },
    {
      section: "Organizational Skills",
      total: 1,
      obtained: categoryMarks.OrganizationalSkills,
    },
    {
      section: "Data Interpretation",
      total: 2,
      obtained: categoryMarks.DataInterpretation,
    },
  ];

  console.log(dataMarks);

  return (
    <div className="">
      {isEntered ? (
        raisecMarks.isRais ? (
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl text-[#FF8400] m-8">{`HELLO ${studentInformation.name.toUpperCase()} !`}</h1>
            <div>
              <h1 className="font-semibold text-2xl text-[#FF8400] mb-8">
                Your result of the RAISEC test is as follows:
              </h1>
              {Object.entries(raisecMarks)
                .filter(([key]) => key !== "isRais")
                .sort(([, valueA], [, valueB]) => valueB - valueA)
                .slice(0, 3)
                .map(([key, value], index) => (
                  <div className="flex flex-col items-center">
                    <div key={index}>
                      <p>{`${key}: ${value}`}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <BarChart
            width={1400}
            height={500}
            data={dataMarks}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="section" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="obtained" stackId="a" fill="#82ca9d" />
            <Bar dataKey="total" stackId="a" fill="#F26955" />
          </BarChart>
        )
      ) : (
        <div className="relative flex flex-col justify-center items-center">
          <div>We need some more information</div>
          <form
            onSubmit={handleSubmit}
            className=" absolute flex flex-col gap-4 rounded-3xl h-[500px] w-[800px] justify-center items-center"
          >
            <div>
              <h1 className="font-semibold m-1">Enter Your Age:</h1>
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="border border-[#FF8400] h-[35px] rounded-md w-[300px] p-2"
              />
            </div>
            <div>
              <h1 className="font-semibold m-1">Enter Your State:</h1>
              <input
                type="text"
                name="state"
                placeholder="State"
                className="border border-[#FF8400] h-[35px] rounded-md w-[300px] p-2"
              />
            </div>
            <div>
              <h1 className="font-semibold m-1">Enter Your Number:</h1>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                className="border border-[#FF8400] h-[35px] rounded-md w-[300px] p-2"
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline bg-[#FF8400] px-4 w-[100px] items-center"
            >
              Submit
            </button>
          </form>
          <img
            src={formImg}
            className="w-[800px] h-[500px] rounded-lg border border-[#FF8400] "
          ></img>
        </div>
      )}
    </div>
  );
}
