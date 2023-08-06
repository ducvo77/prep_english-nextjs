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
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/hook";
import SubmitTest from "./SubmitTest";
import Answer from "./Answer";
import { DataTypes, TestSectionKeys } from "./index";
import Transcript from "./Transcript";

interface TestContentProps {
  data: DataTypes;
  testSection: TestSectionKeys;
}

export default function TestHeader({ data, testSection }: TestContentProps) {
  const dispatch = useDispatch();
  const { part } = useAppSelector((state) => state.infoTestReducer);

  return (
    <div className="flex gap-6">
      <Tabs
        value={part || (data[testSection] || [])[0].name}
        className="border rounded-lg p-5 flex gap-4 flex-col flex-grow"
      >
        <TabsHeader className="flex py-2 bg-white opacity w-1/2 border">
          {data[testSection]?.map(({ name }) => (
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
          {data[testSection]?.map((data, index) => (
            <TabPanel
              key={data.name}
              value={data.name}
              className="flex flex-col gap-10 p-0"
            >
              {data.audio && (
                <audio
                  controls
                  src={process.env.NEXT_PUBLIC_SOURCE_URL + data.audio.url}
                />
              )}
              <Transcript />
              <div className="flex flex-col ">
                <div className="flex gap-5 max-h-[750px]">
                  <div
                    id="topic"
                    className="w-2/3 bg-gray-100 text-gray-900 p-4 font-medium rounded-md overflow-y-scroll"
                  >
                    <Topic data={data} />
                  </div>
                  <Questions data={data} part={index} />
                </div>
              </div>
              {/* <div className="flex justify-end border-t pt-6">
                <button className="uppercase font-medium text-blue-900 flex gap-1 items-center">
                  <span>Tiếp theo</span>
                  <IoIosArrowForward size={20} />
                </button>
              </div> */}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <div className="w-[200px] border p-3 flex flex-col gap-4 flex-shrink-0">
        <SubmitTest />
        <Answer testSection={testSection} data={data} />
      </div>
    </div>
  );
}
