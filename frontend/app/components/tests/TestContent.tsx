"use client";

import Questions from "@/app/components/tests/Questions";
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

interface TestHeaderProp {
  data: TestTest;
  userAssignment?: UserAssignment;
}

export default function TestHeader({ data, userAssignment }: TestHeaderProp) {
  const dispatch = useAppDispatch();
  const { part } = useAppSelector((state) => state.infoTestReducer);

  return (
    <div className="flex gap-6">
      <Tabs
        value={part || data.parts[0].name}
        className="border rounded-lg p-5 flex gap-4 flex-col flex-grow"
      >
        <TabsHeader className="flex py-2 bg-white opacity w-1/2 border">
          {data.parts.map(({ name }) => (
            <Tab
              onClick={() => dispatch(getPartTest({ part: name }))}
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
                  controls
                  src={process.env.NEXT_PUBLIC_SOURCE_URL + part.audio[0].url}
                />
              )}
              {userAssignment && <Transcript data={part} />}
              <div className="flex flex-col ">
                <div className="flex gap-5 max-h-[750px]">
                  <div
                    id="topic"
                    className="w-2/3 bg-gray-100 text-gray-900 p-4 font-medium rounded-md overflow-y-scroll"
                  >
                    <Topic data={part} />
                  </div>
                  <Questions
                    data={part}
                    part={index}
                    userAssignment={userAssignment}
                  />
                </div>
              </div>
              <div className="flex justify-end border-t pt-6">
                <button className="uppercase font-medium text-blue-900 flex gap-1 items-center">
                  <span>Tiếp theo</span>
                  <IoIosArrowForward size={20} />
                </button>
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <div className="w-[200px] border p-3 flex flex-col gap-4 flex-shrink-0">
        {!userAssignment && <SubmitTest data={data} />}
        <Answer data={data} />
      </div>
    </div>
  );
}
