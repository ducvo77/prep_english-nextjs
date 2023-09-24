"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Topic from "@/app/components/tests/Topic";
import SubmitTest from "./SubmitTest";
import Answer from "./Answer";
import Transcript from "./Transcript";
import { memo, useCallback, useEffect, useState } from "react";
import Question from "./question/Question";

interface TestContentProps {
  data: Test;
  userAssignment?: UserAssignment;
}

function TestContent({ data, userAssignment }: TestContentProps) {
  const [active, setActive] = useState(0);

  const handleNextTab = (index: number) => {
    if (active < data.parts.length - 1) setActive(index + 1);
  };

  const handleBackTab = (index: number) => {
    if (active > 0) setActive(index - 1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div className="flex gap-6 sm:flex-row flex-col">
      <div className="border rounded-lg p-5 flex gap-4 flex-col flex-grow">
        <ul className="flex justify-around md:flex-row flex-col bg-white opacity xl:w-1/2 w-full border overflow-hidden">
          {data.parts.map(({ name }, index) => (
            <li
              onClick={() => setActive(index)}
              key={name}
              value={name}
              className={`flex-grow text-sm capitalize font-semibold text-black test cursor-pointer py-2 block text-center ${
                index === active ? "bg-primary text-white" : ""
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
        <ul>
          {data.parts.map(
            (part, index) =>
              index === active && (
                <li
                  key={part.name}
                  value={part.name}
                  className="flex flex-col gap-10 p-0"
                >
                  {part.audio && (
                    <audio
                      className="w-full"
                      controls
                      src={
                        process.env.NEXT_PUBLIC_SOURCE_URL + part.audio[0].url
                      }
                    />
                  )}
                  {userAssignment && data.title.includes("listening") && (
                    <Transcript data={part} />
                  )}
                  <div className="flex flex-col ">
                    <div className="flex lg:flex-row flex-col gap-5 max-h-[750px]">
                      <div
                        id="topic"
                        className="lg:w-2/3 w-full bg-[#00000005] text-gray-900 p-4 text-sm font-normal leading-7 rounded-md overflow-y-scroll"
                      >
                        <Topic data={part} />
                      </div>
                      {
                        <Question
                          isLR={
                            data.title.includes("listening") ||
                            data.title.includes("reading")
                          }
                          isSpeaking={data.title.includes("speaking")}
                          data={part}
                          userAssignment={userAssignment}
                        />
                      }
                    </div>
                  </div>
                  <div className="flex justify-between border-t pt-6">
                    <button
                      onClick={() => handleBackTab(index)}
                      className={`uppercase font-medium text-primary flex gap-1 items-center ${
                        active === 0 ? "opacity-0 cursor-default" : ""
                      }`}
                    >
                      <IoIosArrowBack size={20} />
                      <span>Quay lại</span>
                    </button>
                    <button
                      onClick={() => handleNextTab(index)}
                      className={`uppercase font-medium text-primary flex gap-1 items-center ${
                        active === data.parts.length - 1
                          ? "opacity-0 cursor-default"
                          : ""
                      }`}
                    >
                      <span>Tiếp theo</span>
                      <IoIosArrowForward size={20} />
                    </button>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
      <div className="md:w-[200px] sm:w-[100px] w-full border p-3 flex flex-col gap-4 flex-shrink-0">
        <SubmitTest userAssignment={userAssignment} data={data} />
        <Answer
          setActive={setActive}
          userAssignment={userAssignment}
          data={data}
        />
      </div>
    </div>
  );
}

export default memo(TestContent);
