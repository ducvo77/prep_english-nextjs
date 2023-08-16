"use client";

import { enteredAnswer } from "@/app/redux/features/answerSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button, Textarea } from "@material-tailwind/react";
import { useCallback, useState } from "react";

interface QuestionRWProps {
  data: Question;
  part: number;
  userAssignment?: UserAssignment;
}

export default function QuestionRW({
  data,
  part,
  userAssignment,
}: QuestionRWProps) {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [essay, setEssay] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const answerValue: {
    name: string;
    content: { answer: string; number: number }[];
  }[] = useAppSelector((state) => state.answerReducer);

  const handleEssay = useCallback(
    (value: string, number: number, name: string) => {
      setEssay(value);
      setCount(essay.split(/\s+/).filter((word) => word !== "").length);

      dispatch(
        enteredAnswer({ name, content: [{ number, answer: value.trim() }] })
      );
    },
    [essay, dispatch]
  );
  return (
    <div className="flex flex-col gap-6 w-1/2 mt-1">
      <div className="flex gap-2 items-center">
        <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
          {data.data[0].number}
        </strong>
        <Button
          variant="outlined"
          className="text-[#1A56DB] border-[#1A56DB] capitalize w-[200px]"
          onClick={() => setShow(!show)}
        >
          Thêm ghi chú / dàn ý
        </Button>
      </div>

      {show && (
        <Textarea
          resize
          label="Thêm ghi chú tại đây..."
          className={`w-full h-[84px] transition`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      )}

      <Textarea
        resize
        label="Viết essay tại đây..."
        className="w-full h-auto min-h-[360px]"
        value={essay}
        onChange={(e) =>
          handleEssay(e.target.value, Number(data.data[0].number), data.name)
        }
      />
      <span className="text-gray-900 text-base">Word count: {count}</span>
    </div>
  );
}
