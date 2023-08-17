"use client";

import { Button, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";

interface WSProps {
  data: {
    number: string;
    answer: string;
    explain: string;
    question: string[];
    index: number;
  };
  userAssignment: UserAssignment | undefined;
  valueInput: { [key: number]: string };
  name: string;
  numberQuestion: number;
  handleValueInput: (value: string, number: number, index: number) => void;
  handleChangeInput: (value: string, number: number, name: string) => void;
}

export default function WS({
  data,
  userAssignment,
  valueInput,
  name,
  numberQuestion,
  handleValueInput,
  handleChangeInput,
}: WSProps) {
  const [note, setNote] = useState("");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  // Đếm số từ phần writing
  useEffect(() => {
    const number = name === "Task 1" ? 1 : 2;
    setCount(
      valueInput[number]?.split(/\s+/).filter((word) => word !== "").length
    );
  }, [valueInput, name]);

  return (
    <div key={data.number} className="flex flex-col gap-6 w-full mt-1">
      <div className="flex gap-2 items-center">
        <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
          {data.number}
        </strong>
        {!userAssignment && (
          <Button
            variant="outlined"
            className="text-[#1A56DB] border-[#1A56DB] capitalize w-[200px]"
            onClick={() => setShow(!show)}
          >
            Thêm ghi chú / dàn ý
          </Button>
        )}
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
        label={userAssignment ? "Essay của bạn" : "Viết essay tại đây..."}
        className="w-full h-auto min-h-[360px]"
        value={valueInput[Number(data.number)]}
        onChange={(e) =>
          handleValueInput(e.target.value, Number(data.number), numberQuestion)
        }
        onBlur={() =>
          handleChangeInput(
            valueInput[Number(data.number)],
            Number(data.number),
            name
          )
        }
      />
      <span className="text-gray-900 text-base">Word count: {count || 0}</span>
    </div>
  );
}
