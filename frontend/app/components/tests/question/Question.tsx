"use client";

import { enteredAnswer } from "@/app/redux/features/answerSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useCallback, useEffect, useState } from "react";
import LR from "./LR";
import WS from "./WS";

interface QuestionProps {
  data: Question;
  part: number;
  userAssignment?: UserAssignment;
  isLR: boolean;
  isSpeaking: boolean;
}

export default function Question({
  data,
  part,
  userAssignment,
  isLR,
  isSpeaking,
}: QuestionProps) {
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

      if (index + 1 === number) {
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
        setValueInput((prevState) => ({
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
        (item2) => item2.number === item.number && item2.answer === item.answer
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
          // <li key={number} className="flex gap-2">
          //   <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
          //     {number}
          //   </strong>
          //   <div className="flex flex-col w-full gap-2">
          //     {question.length > 1 ? (
          //       <div className="flex flex-col text-gray-900 font-normal text-sm">
          //         <h3>{question[0]}</h3>
          //         {question.map(
          //           (item, index2) =>
          //             index2 >= 1 && (
          //               <div
          //                 key={item}
          //                 className="flex items-center justify-start text-red-600"
          //               >
          //                 <Radio
          //                   disabled={!!userAssignment}
          //                   onChange={(e) =>
          //                     handleValueInput(
          //                       e.target.value,
          //                       Number(number),
          //                       part * data.data.length + index
          //                     )
          //                   }
          //                   name={item}
          //                   onBlur={() =>
          //                     handleChangeInput(
          //                       valueInput[Number(number)],
          //                       Number(number),
          //                       data.name
          //                     )
          //                   }
          //                   value={item}
          //                   checked={item === valueInput[Number(number)]}
          //                   label={item}
          //                   containerProps={{
          //                     className: "p-0",
          //                   }}
          //                   labelProps={{
          //                     className: `px-2 py-1 font-normal text-gray-900 ${
          //                       !userAssignment
          //                         ? ""
          //                         : `${
          //                             isRightAnswer[Number(number)] &&
          //                             item === valueInput[Number(number)] &&
          //                             "bg-green-200"
          //                           } ${
          //                             !isRightAnswer[Number(number)] &&
          //                             item === valueInput[Number(number)] &&
          //                             "bg-red-200"
          //                           }`
          //                     }`,
          //                   }}
          //                 />
          //               </div>
          //             )
          //         )}
          //       </div>
          //     ) : (
          //       <div className="flex flex-col text-black w-2/3">
          //         <label className="mb-1 text-gray-900 font-normal text-sm">
          //           {question}
          //         </label>
          //         <input
          //           disabled={!!userAssignment}
          //           onBlur={() =>
          //             handleChangeInput(
          //               valueInput[Number(number)],
          //               Number(number),
          //               data.name
          //             )
          //           }
          //           type="text"
          //           className={`border rounded-md focus:border-blue-700 focus:outline-none pl-2 text-black w-full ${
          //             !userAssignment
          //               ? "border-gray-500"
          //               : isRightAnswer[Number(number)]
          //               ? "border-green-200"
          //               : "border-red-200"
          //           }`}
          //           value={valueInput[Number(number)]}
          //           onChange={(e) =>
          //             handleValueInput(
          //               e.target.value,
          //               Number(number),
          //               part * data.data.length + index
          //             )
          //           }
          //         />
          //       </div>
          //     )}
          //     {userAssignment && (
          //       <>
          //         <div className="text-green-500 text-sm">
          //           <strong>Đáp án đúng: </strong>
          //           <span>{answer}</span>
          //         </div>
          //         <ExplainAnswer explain={explain} />
          //       </>
          //     )}
          //   </div>
          // </li>
          <LR
            key={number}
            data={{ number, answer, explain, question, index }}
            userAssignment={userAssignment}
            valueInput={valueInput}
            isRightAnswer={isRightAnswer}
            name={data.name}
            numberQuestion={part * data.data.length + index}
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
            numberQuestion={part * data.data.length + index}
            handleValueInput={handleValueInput}
            handleChangeInput={handleChangeInput}
          />
          // <div key={number} className="flex flex-col gap-6 w-full mt-1">
          //   <div className="flex gap-2 items-center">
          //     <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
          //       {number}
          //     </strong>
          //     {!userAssignment && (
          //       <Button
          //         variant="outlined"
          //         className="text-primary border-pritext-primary capitalize w-[200px]"
          //         onClick={() => setShow(!show)}
          //       >
          //         Thêm ghi chú / dàn ý
          //       </Button>
          //     )}
          //   </div>

          //   {show && (
          //     <Textarea
          //       resize
          //       label="Thêm ghi chú tại đây..."
          //       className={`w-full h-[84px] transition`}
          //       value={note}
          //       onChange={(e) => setNote(e.target.value)}
          //     />
          //   )}

          //   <Textarea
          //     resize
          //     label="Viết essay tại đây..."
          //     className="w-full h-auto min-h-[360px]"
          //     value={valueInput[Number(number)]}
          //     onChange={(e) =>
          //       handleValueInput(
          //         e.target.value,
          //         Number(number),
          //         part * data.data.length + index
          //       )
          //     }
          //     onBlur={() =>
          //       handleChangeInput(
          //         valueInput[Number(number)],
          //         Number(number),
          //         data.name
          //       )
          //     }
          //   />
          //   <span className="text-gray-900 text-base">
          //     Word count: {count || 0}
          //   </span>
          // </div>
        )
      )}
    </ul>
  );
}
