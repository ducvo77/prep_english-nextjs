"use client";

import { enteredAnswer } from "@/app/redux/features/answerSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { memo, useCallback, useEffect, useState } from "react";
import LR from "./LR";
import WS from "./WS";

interface QuestionProps {
  data: Question;

  userAssignment?: UserAssignment;
  isLR: boolean;
  isSpeaking: boolean;
}

function Question({ data, userAssignment, isLR, isSpeaking }: QuestionProps) {
  // Khởi tạo giá trị ban đầu cho valueinput
  const initialValue: { [key: string]: string } = {};
  const initialValueInput = data.data
    .map((item) => item.number)
    .reduce((acc, currentValue) => {
      acc[currentValue] = "";
      return acc;
    }, initialValue);

  const [valueInput, setValueInput] = useState<{ [key: number]: string }>(
    initialValueInput
  );
  const [isRightAnswer, setIsRightAnswer] = useState<{
    [key: number]: boolean;
  }>({});

  const dispatch = useAppDispatch();

  const answerValue: {
    name: string;
    content: { answer: string; number: number }[];
  }[] = useAppSelector((state) => state.answerReducer);
  // Lấy data khi user blur ra ngoài
  const handleChangeInput = useCallback(
    (value: string, number: number, name: string) => {
      if (userAssignment) return;

      if (typeof value !== "undefined") {
        dispatch(
          enteredAnswer({ name, content: [{ number, answer: value.trim() }] })
        );
      } else return;
    },

    [dispatch, userAssignment]
  );

  // Xử lý sự kiện onChange
  const handleValueInput = useCallback(
    (value: string, number: number, index: number) => {
      if (userAssignment) return;

      if (index === number) {
        setValueInput((prevState) => ({
          ...prevState,
          [number]: value,
        }));
      }
    },
    [userAssignment]
  );

  // Lấy data khi người dùng reload trình duyệt
  useEffect(() => {
    const arrayData = userAssignment ? userAssignment.data.data : answerValue;

    arrayData?.map(({ content }) => {
      content.map((item) => {
        return setValueInput((prevState) => ({
          ...prevState,
          [item.number]: item.answer,
        }));
      });
    });
  }, [answerValue, userAssignment]);

  // Chấm điểm bài làm ở trang result
  useEffect(() => {
    const newArrayUserAssignment = userAssignment?.data.data
      ?.map((item) => item.content)
      .flat();
    const newArrayData = [...data.data];

    newArrayUserAssignment?.map((item) => {
      const isCorrect = newArrayData.filter(
        (item2) =>
          item2.number === item.number &&
          item2.answer.toLowerCase() === item.answer.toLowerCase()
      )[0]?.answer;

      if (isCorrect) {
        setIsRightAnswer((prevState) => ({
          ...prevState,
          [item.number]: true,
        }));
      } else {
        setIsRightAnswer((prevState) => ({
          ...prevState,
          [item.number]: false,
        }));
      }
    });
  }, [userAssignment, data]);

  return (
    <ul className="flex flex-col gap-10 overflow-y-scroll pb-10 lg:w-1/3 w-full h-full max-h-[750px]">
      {data.data.map(({ number, answer, explain, question }, index) =>
        isLR ? (
          <LR
            key={number}
            data={{ number, answer, explain, question, index }}
            userAssignment={userAssignment}
            valueInput={valueInput}
            isRightAnswer={isRightAnswer}
            name={data.name}
            numberQuestion={Number(number)}
            handleValueInput={handleValueInput}
            handleChangeInput={handleChangeInput}
          />
        ) : (
          <WS
            isSpeaking={isSpeaking}
            key={number}
            data={{ number, answer, explain, question, index }}
            userAssignment={userAssignment}
            valueInput={valueInput}
            name={data.name}
            numberQuestion={Number(number)}
            handleValueInput={handleValueInput}
            handleChangeInput={handleChangeInput}
          />
        )
      )}
    </ul>
  );
}

export default memo(Question);
