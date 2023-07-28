"use client";

import Answer from "@/app/components/tests/Answer";
import Questions from "@/app/components/tests/Questions";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { LISTENING, READING } from "../../../fakeData";
import ButtonOutPage from "@/app/components/button/ButtonOutPage";
import TimeCount from "@/app/components/tests/TimeCount";
import { IoIosArrowForward } from "react-icons/io";
import Topic from "@/app/components/tests/Topic";

export default function page() {
  const fetchData = LISTENING;

  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <h2 className="text-lg font-semibold">{fetchData.title}</h2>
          <ButtonOutPage />
        </div>
        <p>{fetchData.label}</p>
      </div>
      <div className="flex gap-6">
        <Tabs
          value={fetchData.data[0].name}
          className="border rounded-lg p-5 flex gap-4 flex-col flex-grow"
        >
          <TabsHeader className="flex py-2 bg-white opacity w-1/2 border">
            {fetchData.data.map(({ name }) => (
              <Tab
                key={name}
                value={name}
                className="text-sm capitalize font-semibold text-[#1A56DB] test"
              >
                {name}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {fetchData.data.map((data, index) => (
              <TabPanel
                key={data.name}
                value={data.name}
                className="flex flex-col gap-10 p-0"
              >
                {data.audio && <audio controls src={data.audio}></audio>}
                <div className="flex flex-col ">
                  <div className="flex gap-5 max-h-[750px]">
                    <div className="w-2/3 bg-gray-100 text-black p-3 font-medium rounded-md">
                      <Topic />
                    </div>
                    <Questions data={data} part={index} />
                  </div>
                  <div className="flex justify-end border-t pt-6">
                    <button className="uppercase font-medium text-blue-900 flex gap-1 items-center">
                      <span>Tiếp theo</span>
                      <IoIosArrowForward size={20} />
                    </button>
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
        <div className="w-[200px] border p-3 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span>Thời gian làm</span>
            <p className="font-semibold text-xl">
              <TimeCount />
            </p>
          </div>
          <Button
            variant="outlined"
            className="text-lg hover:opacity-100 hover:bg-blue-800 hover:text-white"
          >
            Nộp bài
          </Button>
          <Answer data={fetchData} />
        </div>
      </div>
    </div>
  );
}
