import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const ResultDetails = ({ type, result }) => {
  console.log(result);
  const data =
    type === "IQ TEST"
      ? [
          { section: "Logical", total: 8, obtained: result.LogicalReasoning },
          { section: "Verbal", total: 9, obtained: result.Verbal },
          { section: "Numerical", total: 9, obtained: result.NumericalAbility },
          { section: "Leadership", total: 3, obtained: result.Leadership },
          { section: "Decision", total: 5, obtained: result.DecisionMaking },
          {
            section: "Organizational",
            total: 1,
            obtained: result.OrganizationalSkills,
          },
          { section: "Data", total: 2, obtained: result.DataInterpretation },
        ]
      : [
          { section: "Realistic", total: 8, obtained: result.Realistic },
          {
            section: "Investigative",
            total: 8,
            obtained: result.Investigative,
          },
          { section: "Social", total: 8, obtained: result.Social },
          { section: "Enterprising", total: 8, obtained: result.Enterprising },
          { section: "Conventional", total: 8, obtained: result.Conventional },
          { section: "Artistic", total: 8, obtained: result.Artistic },
        ];

  console.log(data);

  return (
    <div className="flex flex-col -mt-[30px]">
      {/* Header */}
      <h1 className="mx-auto text-textColor text-[24px] font-semibold mb-2">
        TEST RESULT
      </h1>
      <div className="mx-6 flex justify-between p-4 border-b bg-primaryColor text-white border-black rounded-md">
        <h1>Test Type: {type}</h1>
        <h1>Total Questions: 40</h1>
        <h1>Total Score: {result.total}</h1>
        <h1>Time Taken: 15 min</h1>
      </div>
      <div className="gap-4 mx-6 h-[750px] border border-black rounded-md overflow-scroll">
        {/* Inside box */}
        <div className="flex flex-col gap-4">
          {/* Section 1: Summary Charts */}
          <div className="flex flex-col gap-4 mx-4 ">
            <div className="flex justify-center border-b-2 mx-8 mt-5 border-primaryColor">
              <h1 className="text-textColor text-[18px] font-semibold mb-3">
                SUMMARY
              </h1>
            </div>
            <div className="flex flex-col gap-[80px] mx-1">
              <div className="flex gap-4 justify-between">
                <ResponsiveContainer
                  width="50%"
                  height={400}
                  className="flex flex-col"
                >
                  <AreaChart
                    data={data}
                    syncId="anyId"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="section" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="obtained"
                      stroke="#6a3da5"
                      fill="#82ca9d"
                    />
                  </AreaChart>
                  {/* <h1 className="mx-auto mt-2">
                    Shows performance in each topic across all questions in
                    sequential order.
                  </h1> */}
                </ResponsiveContainer>
                <div className="w-[50%] mr-4">
                  <h1 className=" font-semibold text-primaryColor text-[20px]">
                    Performance Trend Across Topics
                  </h1>
                  <h1 className="mt-2">
                    The line chart in this section visualizes the user’s
                    performance across all questions in sequential order, broken
                    down by topic. Each line represents a specific topic (e.g.,
                    Logical Reasoning, Verbal, Numerical Ability), allowing
                    users to track their progress as they move through the test.
                  </h1>
                  <ul className="flex flex-col gap-1 mt-1">
                    <li className="flex flex-col">
                      <h3 className="font-semibold text-[16px]">
                        Identify Strengths and Weaknesses:
                      </h3>
                      By following the peaks and troughs of each line, users can
                      see which topics they consistently performed well in and
                      where they struggled.
                    </li>
                    <li>
                      <h3 className="font-semibold text-[16px]">
                        Trend Analysis:
                      </h3>
                      Users can identify patterns, such as improvement over time
                      or areas where their performance dropped during the test.
                      This helps in understanding how fatigue or specific
                      question types affected their scores.
                    </li>
                    <li>
                      <h3 className="font-semibold text-[16px]">
                        Comparative Performance:
                      </h3>
                      Multiple lines enable comparison between different topics,
                      highlighting which areas require more practice and which
                      are strong points.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-[100px] border-b-4 rounded-2xl border-primaryColor mx-auto"></div>

              <div className="flex gap-4 justify-between">
                <div className="w-[50%] ml-4 mt-4">
                  <h1 className=" font-semibold text-primaryColor text-[20px]">
                    Topic-wise Performance Summary
                  </h1>
                  <h1 className="mt-2">
                    The bar chart in this section provides a visual breakdown of
                    the user’s score for each topic in the test. Each bar
                    corresponds to a specific topic (e.g., Logical Reasoning,
                    Verbal, Numerical Ability), and the height of the bar
                    reflects the score achieved in that topic.
                  </h1>
                  <ul className="flex flex-col gap-1 mt-1">
                    <li className="flex flex-col">
                      <h3 className="font-semibold text-[16px]">
                        Quick Performance Overview:
                      </h3>
                      Users can instantly see which topics they excelled in by
                      identifying the tallest bars, as well as areas that need
                      improvement where the bars are shorter.
                    </li>
                    <li>
                      <h3 className="font-semibold text-[16px]">
                        Comparative Analysis:
                      </h3>
                      The chart makes it easy to compare performance across
                      different topics side by side. This helps users prioritize
                      which topics require more focus and practice.
                    </li>
                    <li>
                      <h3 className="font-semibold text-[16px]">
                        Visual Score Representation:
                      </h3>
                      The height of each bar directly correlates to the score,
                      with taller bars indicating higher scores and shorter bars
                      indicating lower performance.
                    </li>
                  </ul>
                </div>
                <ResponsiveContainer
                  width="50%"
                  height={400}
                  className="flex flex-col"
                >
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
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
                    <Bar dataKey="obtained" fill="#8884d8" />
                    <Bar dataKey="total" fill="#82ca9d" />
                  </BarChart>
                  {/* <h1 className="mx-auto mt-2">
                    Each bar represents a topic. Bar height corresponds to the
                    score for each topic.
                  </h1> */}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
