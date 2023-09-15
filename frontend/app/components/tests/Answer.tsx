"use client";

import { useAppSelector } from "@/app/redux/hook";
import { memo } from "react";

interface AnswerProps {
  data: Test;
  userAssignment?: UserAssignment;
}

function Answer({ data, userAssignment }: AnswerProps) {
  const answerValue: AnswerState[] = useAppSelector(
    (state) => state.answerReducer
  );

  const setClassName = (number: string, answer: string) => {
    const newArrayUserAssignment = userAssignment?.data.data
      ?.map((item) => item.content)
      .flat();
    if (newArrayUserAssignment) {
      if (
        newArrayUserAssignment.find(
          (item) =>
            (item.number === number && item.answer === answer) ||
            ((data.title.includes("writing") ||
              data.title.includes("speaking")) &&
              newArrayUserAssignment.find((item) => item.number == number))
        )
      ) {
        return "bg-green-800 border-green-800 text-white";
      }

      if (
        newArrayUserAssignment.find(
          (item) => item.number === number && item.answer !== answer
        )
      ) {
        return "bg-red-800 border-red-800 text-white";
      }

      return "border-red-800";
    } else {
      if (
        answerValue.find((item) =>
          item.content.find((item) => item.number === Number(number))
        )
      ) {
        return "bg-primary border-primary text-white";
      }
    }
  };

  return (
    <>
      {data.parts.map(({ name, data }) => (
        <div key={name} className="flex flex-col gap-2">
          <h3 className="font-medium md:text-sm text-xs capitalize ">{name}</h3>
          <ul className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-10 gap-2 text-[0.75rem]">
            {data.map(({ number, answer }) => (
              <li
                key={number}
                className={
                  setClassName(number, answer) +
                  " " +
                  "border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer"
                }
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default memo(Answer);
