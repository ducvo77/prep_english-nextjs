"use client";

import { enteredAnswer } from "@/app/redux/features/answerSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Radio } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import ExplainAnswer from "./ExplainAnswer";

interface QuestionsProps {
  data: Question;
  part: number;
  userAssignment?: UserAssignment;
}

export default function Questions({
  data,
  part,
  userAssignment,
}: QuestionsProps) {
  const [valueInputs, setInputValues] = useState<{ [key: number]: string }>({});
  const dispatch = useAppDispatch();
  const answerValue: {
    name: string;
    content: { answer: string; number: number }[];
  }[] = useAppSelector((state) => state.answerReducer);

  const handleChangeInput = useCallback(
    (value: string, number: number, name: string) => {
      if (typeof value !== "undefined") {
        dispatch(
          enteredAnswer({ name, content: [{ number, answer: value.trim() }] })
        );
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
    const arrayData = userAssignment ? userAssignment.data.data : answerValue;
    arrayData.map(({ content }) => {
      content.map((item) => {
        setInputValues((prevState) => ({
          ...prevState,
          [item.number]: item.answer,
        }));
      });
    });
  }, [answerValue, userAssignment]);

  return (
    <ul className="flex flex-col gap-10 overflow-y-scroll pb-10 w-1/3 h-full max-h-[750px]">
      {data.data.map(({ number, answer, explain, question }, index) => (
        <li key={number} className="flex gap-2">
          <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
            {number}
          </strong>
          <div className="flex flex-col w-full gap-2">
            {question.length > 1 ? (
              <div className="flex flex-col text-gray-900 font-normal text-sm">
                <h3>{question[0]}</h3>
                {question.map(
                  (item, index2) =>
                    index2 >= 1 && (
                      <div
                        key={item}
                        className="flex items-center justify-start"
                      >
                        <Radio
                          onChange={(e) =>
                            handleValueInput(
                              e.target.value,
                              Number(number),
                              part * data.data.length + index
                            )
                          }
                          name={"question" + index}
                          onBlur={() =>
                            handleChangeInput(
                              valueInputs[Number(number)],
                              Number(number),
                              data.name
                            )
                          }
                          value={item}
                          checked={item === valueInputs[Number(number)]}
                          label={item}
                        />
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="flex flex-col text-black w-2/3">
                <label className="mb-1 text-gray-900 font-normal text-sm">
                  {question}
                </label>
                <input
                  onBlur={() =>
                    handleChangeInput(
                      valueInputs[Number(number)],
                      Number(number),
                      data.name
                    )
                  }
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-blue-700 focus:outline-none pl-2 text-black w-full"
                  value={valueInputs[Number(number)] || ""}
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
            {userAssignment && (
              <>
                <div className="text-green-500 text-sm">
                  <strong>Đáp án đúng: </strong>
                  <span>{answer}</span>
                </div>
                <ExplainAnswer explain={explain} />
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
