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
      console.log(index, number);
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
          <div className="flex flex-col text-black w-2/3">
            <label className="">{question}</label>
            <input
              id=""
              onBlur={() => handleChangeInput(valueInputs[number], number)}
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

          {/* <div>
            <h3>Please select your favorite Web language:</h3>
            <input
              onChange={() => handleChangeInput(valueInputs[number], number)}
              value="HTML"
              // onChange={(e) =>
              //   handleValueInput(
              //     e.target.value,
              //     number,
              //     part * data.data.length + index
              //   )
              // }
              type="radio"
              id="html"
              name="fav_language"
              checked={valueInputs[number] === "HTML"}
            />
            <label htmlFor="html">HTML</label>
            <br />
            <input
              onBlur={() => handleChangeInput(valueInputs[number], number)}
              value="CSS"
              onChange={(e) =>
                handleValueInput(
                  e.target.value,
                  number,
                  part * data.data.length + index
                )
              }
              type="radio"
              id="css"
              name="fav_language"
              checked={valueInputs[number] === "CSS"}
            />
            <label htmlFor="css">CSS</label>
            <br />
            <input
              onBlur={() => handleChangeInput(valueInputs[number], number)}
              value="JavaScript"
              onChange={(e) =>
                handleValueInput(
                  e.target.value,
                  number,
                  part * data.data.length + index
                )
              }
              type="radio"
              id="javascript"
              name="fav_language"
              checked={valueInputs[number] === "JavaScript"}
            />
            <label htmlFor="javascript">JavaScript</label>
          </div> */}
        </li>
      ))}
    </ul>
  );
}
