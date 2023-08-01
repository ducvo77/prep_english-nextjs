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
      question: string[];
      answer: string;
      explain: string;
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
    <ul className="flex flex-col gap-10 overflow-y-scroll pb-10 w-1/3 h-full max-h-[750px]">
      {data.data.map(({ number, answer, explain, question }, index) => (
        <li key={number} className="flex gap-2">
          <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
            {number}
          </strong>
          {question.length > 1 ? (
            <div className="flex flex-col text-gray-900 font-normal">
              <h3>{question[0]}</h3>
              {question.map(
                (item, index2) =>
                  index2 >= 1 && (
                    <div key={item} className="flex items-center justify-start">
                      <input
                        onChange={(e) =>
                          handleValueInput(
                            e.target.value,
                            Number(number),
                            part * data.data.length + index
                          )
                        }
                        onBlur={() =>
                          handleChangeInput(valueInputs[number], Number(number))
                        }
                        value={item}
                        type="radio"
                        id={"question" + index + index2}
                        name={"question" + index}
                        checked={item === valueInputs[number]}
                      />
                      <label
                        htmlFor={"question" + index + index2}
                        className="pl-2"
                      >
                        {item}
                      </label>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="flex flex-col text-black w-2/3">
              <label className="">{question}</label>
              <input
                id=""
                onBlur={() =>
                  handleChangeInput(valueInputs[number], Number(number))
                }
                type="text"
                className="border rounded-md border-gray-500 focus:border-blue-700 focus:border-2 focus:outline-none pl-2 text-black w-full"
                value={valueInputs[number] || ""}
                onChange={(e) =>
                  handleValueInput(
                    e.target.value,
                    Number(number),
                    part * data.data.length + index
                  )
                }
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
