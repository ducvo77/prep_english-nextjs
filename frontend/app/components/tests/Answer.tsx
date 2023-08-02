"use client";

import { useAppSelector } from "@/app/redux/hook";

import { DataTypes, TestSectionKeys } from "./index";

interface AnswerTypes {
  data: DataTypes;
  testSection: TestSectionKeys;
}

export default function Answer({ data, testSection }: AnswerTypes) {
  const answerValue: { value: string; number: number }[] = useAppSelector(
    (state) => state.answerReducer
  );

  return (
    <>
      {(data[testSection] || []).map(({ name, data }) => (
        <div key={name} className="flex flex-col gap-2">
          <h3 className="font-medium capitalize">{name}</h3>
          <ul className="grid grid-cols-5 gap-2 text-[0.75rem]">
            {data.map(({ number }) => (
              <li
                key={number}
                className={`${
                  answerValue.find((item) => item.number === Number(number))
                    ? "bg-blue-800 text-white"
                    : ""
                } border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer`}
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
