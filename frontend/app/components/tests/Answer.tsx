"use client";

import { useAppSelector } from "@/app/redux/hook";
import { Dispatch, SetStateAction, memo } from "react";

interface AnswerProps {
  data: Test;
  userAssignment?: UserAssignment;
  setActive: Dispatch<SetStateAction<number>>;
}

function Answer({ data, userAssignment, setActive }: AnswerProps) {
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
            (item.number === number &&
              item.answer.toLowerCase() === answer.toLowerCase()) ||
            ((data.title.includes("writing") ||
              data.title.includes("speaking")) &&
              newArrayUserAssignment.find((item) => item.number == number))
        )
      ) {
        return "bg-green border-green text-white";
      }

      if (
        newArrayUserAssignment.find(
          (item) => item.number === number && item.answer !== answer
        )
      ) {
        return "bg-danger border-danger text-white";
      }

      return "border-danger";
    } else {
      if (
        answerValue.find((item) =>
          item.content.find((item) => item.number === Number(number))
        )
      ) {
        return "bg-primary border-primary text-white";
      } else {
        return "border-gray-800";
      }
    }
  };

  const handleActiveTab = (name: string) => {
    const array = name.split(" ");
    setActive(Number(array[array.length - 1]) - 1);
  };

  return (
    <>
      {data.parts.map(({ name, data }) => (
        <div key={name} className="flex flex-col gap-2">
          <h3 className="font-medium md:text-sm text-xs capitalize">{name}</h3>
          <ul className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-10 gap-2 text-[0.75rem]">
            {data.map(({ number, answer }) => (
              <li
                onClick={() => handleActiveTab(name)}
                key={number}
                className={
                  "border  w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer" +
                  " " +
                  setClassName(number, answer)
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
