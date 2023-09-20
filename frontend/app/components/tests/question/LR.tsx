"use client";

import { memo } from "react";
import ExplainAnswer from "../ExplainAnswer";

interface LRPRops {
  data: {
    number: string;
    answer: string;
    explain: string;
    question: string[];
    index: number;
  };
  userAssignment: UserAssignment | undefined;
  valueInput: { [key: number]: string };
  isRightAnswer: {
    [key: number]: boolean;
  };
  name: string;
  numberQuestion: number;
  handleValueInput: (value: string, number: number, index: number) => void;
  handleChangeInput: (value: string, number: number, name: string) => void;
}

function LR({
  data,
  userAssignment,
  valueInput,
  isRightAnswer,
  name,
  numberQuestion,
  handleValueInput,
  handleChangeInput,
}: LRPRops) {
  return (
    <li className="flex gap-2">
      <div className="min-w-[32px] h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center cursor-pointer">
        <span className="text-sm font-medium">{data.number}</span>
      </div>
      <div className="flex flex-col w-full gap-2">
        {data.question.length > 1 ? (
          <div className="flex flex-col text-gray-900 font-normal text-sm">
            <h3>{data.question[0]}</h3>
            {data.question.map(
              (item, index2) =>
                index2 >= 1 && (
                  <div
                    key={item}
                    className="flex items-center justify-start text-danger"
                  >
                    <input
                      type="radio"
                      disabled={!!userAssignment}
                      checked={item === valueInput[Number(data.number)]}
                      id={item + data.number}
                      name={item + data.number}
                      value={item}
                      onChange={(e) =>
                        handleValueInput(
                          e.target.value,
                          Number(data.number),
                          numberQuestion
                        )
                      }
                      onBlur={() =>
                        handleChangeInput(
                          valueInput[Number(data.number)],
                          Number(data.number),
                          name
                        )
                      }
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={item + data.number}
                      className={`cursor-pointer px-2 py-1 font-normal text-gray-900 ${
                        !userAssignment
                          ? ""
                          : `${
                              isRightAnswer[Number(data.number)] &&
                              item === valueInput[Number(data.number)] &&
                              "bg-green bg-opacity-70"
                            } ${
                              !isRightAnswer[Number(data.number)] &&
                              item === valueInput[Number(data.number)] &&
                              "bg-danger bg-opacity-70"
                            }`
                      }`}
                    >
                      {item}
                    </label>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="flex flex-col text-black w-2/3">
            <label className="mb-1 text-gray-900 font-normal text-sm">
              {data.question}
            </label>
            <input
              disabled={!!userAssignment}
              onBlur={() =>
                handleChangeInput(
                  valueInput[Number(data.number)],
                  Number(data.number),
                  name
                )
              }
              type="text"
              className={`border rounded-md focus:border-blue-700 focus:outline-none pl-2 text-black w-full ${
                !userAssignment
                  ? "border-gray-500"
                  : isRightAnswer[Number(data.number)]
                  ? "border-green"
                  : "border-red-200"
              }`}
              value={valueInput[Number(data.number)]}
              onChange={(e) =>
                handleValueInput(
                  e.target.value,
                  Number(data.number),
                  numberQuestion
                )
              }
            />
          </div>
        )}
        {userAssignment && (
          <>
            <div className="text-green text-sm">
              <span className="font-medium">Đáp án đúng: </span>
              <span>{data.answer}</span>
            </div>
            <ExplainAnswer explain={data.explain} />
          </>
        )}
      </div>
    </li>
  );
}

export default memo(LR);
