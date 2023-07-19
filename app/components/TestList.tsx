"use client";

import { Button } from "@material-tailwind/react";

const TEST_LIST = [
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
  {
    title: "C18 IELT Reading test 1",
    content: "Bộ đề thi: IELT Reading test 1",
    hastag: "#IELT #READING",
  },
];

export default function TestList() {
  return (
    <div className="grid grid-cols-4 gap-10">
      {TEST_LIST.map((test, index) => (
        <div
          key={`number ${index}`}
          className="border h-auto p-4 rounded-lg bg-[#F8F9FA] flex flex-col gap-4"
        >
          <h3 className="font-semibold">{test.title}</h3>
          <div>
            <span>{test.content}</span>
          </div>
          <span className="text-[0.75rem] text-[#1A56DB] cursor-pointer">
            {test.hastag}
          </span>
          <Button
            variant="outlined"
            className="font-semibold second-color border-[#1A56DB] hover:bg-[#1A56DB] hover:text-white py-2"
          >
            Chi tiết
          </Button>
        </div>
      ))}
    </div>
  );
}
