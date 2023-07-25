// "use client";

import { Button } from "@material-tailwind/react";

import { TEST_LIST } from "../../fakeData";
import { useRouter } from "next/navigation";

export default function TestList() {
  const router = useRouter();

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-12 lg:gap-8 md:gap-4 gap-2">
      {TEST_LIST.map(
        ({
          id,
          title,
          label,
          time,
          part_number,
          question_number,
          hastags,
          href,
        }) => (
          <div
            key={id}
            className="border h-auto p-4 rounded-lg bg-[#F8F9FA] flex flex-col gap-2"
          >
            <h3 className="font-semibold">{title}</h3>
            <div className="flex flex-col gap-1 text-[#677788] text-sm font-medium">
              <span>{label}</span>
              <div className="flex gap-1">
                <span className=" border-r-2 border-[#677788] pr-1">
                  {time} phút
                </span>
                <span className=" border-r-2 border-[#677788] pr-1">
                  {part_number} phần thi
                </span>
                <span>{question_number} câu hỏi</span>
              </div>
            </div>
            <div className="flex gap-3">
              {hastags.map((hastag) => (
                <span
                  key={hastag}
                  className="text-[0.75rem] text-[#1A56DB] cursor-pointer"
                >
                  {hastag}
                </span>
              ))}
            </div>
            <Button
              onClick={() => router.push(href)}
              variant="outlined"
              className="font-semibold second-color border-[#1A56DB] hover:bg-[#1A56DB] hover:text-white py-2"
            >
              Chi tiết
            </Button>
          </div>
        )
      )}
    </div>
  );
}
