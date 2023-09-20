"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TabSpeaking from "./TabSpeaking";
import TabReading from "./TabReading";
import TabWriting from "./TabWriting";
import { useEffect, useState } from "react";

const data = [
  {
    label: "Speaking",
  },
  {
    label: "Reading",
  },
  {
    label: "Writing",
  },
];

export default function PromptChatgpt() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <>
      <Tabs value="Speaking">
        <TabsHeader className="bg-[#DFE0DF] bg-opacity-50 ">
          {data.map(({ label }) => (
            <Tab
              key={label}
              value={label}
              // className="text-white"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        {isVisible && (
          <TabsBody className="overflow-visible mt-6">
            <TabPanel value="Speaking" className="flex flex-col gap-10">
              <TabSpeaking />
            </TabPanel>
            <TabPanel value="Reading" className="flex flex-col gap-10">
              <TabReading />
            </TabPanel>
            <TabPanel value="Writing" className="flex flex-col gap-10">
              <TabWriting />
            </TabPanel>
          </TabsBody>
        )}
      </Tabs>
    </>
  );
}
