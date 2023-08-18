"use client";

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { IoIosArrowForward } from "react-icons/io";
import Topic from "@/app/components/tests/Topic";
import { getPartTest } from "@/app/redux/features/infoTestSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import SubmitTest from "./SubmitTest";
import Answer from "./Answer";
import Transcript from "./Transcript";
import { useCallback, useState } from "react";
import Question from "./question/Question";

interface TestHeaderProp {
  data: Test;
  userAssignment?: UserAssignment;
}

export default function TestHeader({ data, userAssignment }: TestHeaderProp) {
  const dispatch = useAppDispatch();
  const { part } = useAppSelector((state) => state.infoTestReducer);
  const [activeTab, setActiveTab] = useState(part || data.parts[0].name);

  const handleClickTab = useCallback(
    (name: string) => {
      dispatch(getPartTest({ part: name })), setActiveTab(name);
    },
    [dispatch]
  );

  return (
    <div className="flex gap-6 sm:flex-row flex-col">
      <Tabs
        value={activeTab}
        className="border rounded-lg p-5 flex gap-4 flex-col flex-grow"
      >
        <TabsHeader
          aria-selected={activeTab}
          className="flex md:flex-row flex-col py-2 bg-white opacity xl:w-1/2 w-full border"
        >
          {data.parts.map(({ name }) => (
            <Tab
              onClick={() => handleClickTab(name)}
              key={name}
              value={name}
              className="text-sm capitalize font-semibold text-[#1A56DB] test"
            >
              {name}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.parts.map((part, index) => (
            <TabPanel
              key={part.name}
              value={part.name}
              className="flex flex-col gap-10 p-0"
            >
              {part.audio && (
                <audio
                  className="w-full"
                  controls
                  src={process.env.NEXT_PUBLIC_SOURCE_URL + part.audio[0].url}
                />
              )}
              {userAssignment &&
                (data.title.includes("reading") ||
                  data.title.includes("listening")) && (
                  <Transcript data={part} />
                )}
              <div className="flex flex-col ">
                <div className="flex lg:flex-row flex-col gap-5 max-h-[750px]">
                  <div
                    id="topic"
                    className="lg:w-2/3 w-full bg-gray-100 text-gray-900 p-4 font-medium rounded-md overflow-y-scroll"
                  >
                    <Topic data={part} />
                  </div>
                  {
                    <Question
                      isLR={
                        data.title.includes("listening") ||
                        data.title.includes("reading")
                      }
                      data={part}
                      part={index}
                      userAssignment={userAssignment}
                    />
                  }
                </div>
              </div>
              {/* <div className="flex justify-end border-t pt-6">
                <button
                  onClick={() => setActiveTab(data.parts[0].name)}
                  className="uppercase font-medium text-blue-900 flex gap-1 items-center"
                >
                  <span>Tiếp theo</span>
                  <IoIosArrowForward size={20} />
                </button>
              </div> */}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <div className="md:w-[200px] sm:w-[100px] w-full border p-3 flex flex-col gap-4 flex-shrink-0">
        <SubmitTest userAssignment={userAssignment} data={data} />
        <Answer data={data} />
      </div>
    </div>
  );
}
