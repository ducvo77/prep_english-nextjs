"use client";

import { enteredAnswer } from "@/app/redux/features/answerSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useCallback, useEffect, useState } from "react";

interface QuestionsProps {
  data: {
    name: string;
    audio: string | boolean;
    topic: string;
    data: {
      number: number;
      question: string;
      answer: string;
    }[];
  };
  part: number;
}

export default function Questions({ data, part }: QuestionsProps) {
  const [valueInputs, setInputValues] = useState<{ [key: number]: string }>({});
  const dispatch = useAppDispatch();
  const answerValue: { value: string; number: number }[] = useAppSelector(
    (state) => state.answerReducer
  );

  const handleChangeInput = useCallback(
    (value: string, number: number) => {
      if (typeof value !== "undefined") {
        dispatch(enteredAnswer({ number, value }));
      } else return;
    },

    [dispatch]
  );
  const handleValueInput = useCallback(
    (value: string, number: number, index: number) => {
      if (index + 1 === number) {
        setInputValues((prevState) => ({
          ...prevState,
          [number]: value,
        }));
      }
    },
    []
  );

  useEffect(() => {
    answerValue.map(({ number, value }) => {
      setInputValues((prevState) => ({
        ...prevState,
        [number]: value,
      }));
    });
  }, [answerValue]);

  return (
    <ul className="flex flex-col gap-10 overflow-y-scroll pb-10 w-1/3">
      {data.data.map(({ number }, index) => (
        <li key={number} className="flex gap-2">
          <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
            {number}
          </strong>
          <input
            onBlur={() => handleChangeInput(valueInputs[number], number)}
            type="text"
            className="border rounded-md border-gray-500 focus:border-blue-700 focus:border-2 focus:outline-none pl-2 text-black w-2/3"
            value={valueInputs[number] || ""}
            onChange={(e) =>
              handleValueInput(
                e.target.value,
                number,
                part * data.data.length + index
              )
            }
          />
        </li>
      ))}
    </ul>
  );
}
