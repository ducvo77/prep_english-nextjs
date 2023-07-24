"use client";

import Answer from "@/app/components/tests/Answer";
import { Button } from "@material-tailwind/react";

export default function page() {
  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <h2 className="text-lg font-semibold">C18 IELTS listening test 1</h2>
          <Button variant="outlined" className="p-2 text-xs capitalize">
            Thoát
          </Button>
        </div>
        <p>Bộ đề thi: IELTS C18 Full Test 1</p>
      </div>
      <div className="flex gap-6">
        <div className="border rounded-lg p-5 flex gap-6 flex-col flex-grow">
          <ul className="flex gap-2">
            <Button
              variant="filled"
              className="p-3 text-xs capitalize font-normal"
            >
              Recording 1
            </Button>
            <Button
              variant="outlined"
              className="p-3 text-xs capitalize font-normal"
            >
              Recording 2
            </Button>
            <Button
              variant="outlined"
              className="p-3 text-xs capitalize font-normal"
            >
              Recording 3
            </Button>
            <Button
              variant="outlined"
              className="p-3 text-xs capitalize font-normal"
            >
              Recording 4
            </Button>
          </ul>
          <audio
            controls
            src="/resources/ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3"
          ></audio>
          <div className="flex gap-6 max-h-[750px]">
            <div className="w-2/3 h-[750px] bg-gray-100"></div>
            <ul className="flex flex-col gap-10 overflow-y-scroll pb-10 w-1/3">
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  1
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  1
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  2
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  3
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  4
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  5
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  6
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  7
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  8
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  9
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
              <li className="flex gap-2">
                <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
                  10
                </strong>
                <input
                  type="text"
                  className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[200px] border p-3 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span>Thời gian còn lại</span>
            <p className="font-semibold text-xl">00:00</p>
          </div>
          <Button
            variant="outlined"
            className="text-lg hover:opacity-100 hover:bg-blue-800 hover:text-white"
          >
            Nộp bài
          </Button>
          <Answer label="Recording 1" />
          <Answer label="Recording 2" />
          <Answer label="Recording 3" />
          <Answer label="Recording 4" />
        </div>
      </div>
    </div>
  );
}
