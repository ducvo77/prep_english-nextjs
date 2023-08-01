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
import ButtonOutPage from "@/app/components/tests/ButtonOutPage";
import TimeCount from "@/app/components/tests/TimeCount";
import { IoIosArrowForward } from "react-icons/io";
import Topic from "@/app/components/tests/Topic";
import { useEffect, useState } from "react";
import getListeningTest from "@/app/actions/getListeningTest";
import { useParams, usePathname } from "next/navigation";
import getTestList from "@/app/actions/getTestList";
import { useDispatch } from "react-redux";
import { getPartTest } from "@/app/redux/features/infoTestSlice";
import { useAppSelector } from "@/app/redux/hook";

interface DataTypes {
  id: number;
  title: string;
  time: number;
  part_number: number;
  question_number: number;
  hastags: string[];
  href: string;
  test_kit: { id: number; label: string };
  testSection: {
    id: number;
    name: string;
    topic: {
      content: string;
    };
    data: {
      number: string;
      answer: string;
      explain: string;
      question: string[];
    }[];
    audio?: {
      url: string;
    };
  }[];
}
type TestSectionKeys = "listening_tests" | "reading_tests";

let testSection: TestSectionKeys = "listening_tests";

export default function Test() {
  const [testId, setTestId] = useState(NaN);
  const [data, setData] = useState<DataTypes | null>(null);
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { part } = useAppSelector((state) => state.infoTestReducer);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestList();
      const newArray = res.data.filter(
        (item: { href: string }) => item.href === pathname
      );
      setTestId(newArray[0].id);
    };
    fetchData();
  }, [pathname]);

  useEffect(() => {
    if (params?.title.includes("listening")) {
      testSection = "listening_tests";
    }
    if (params?.title.includes("reading")) {
      testSection = "reading_tests";
    }
  }, [params?.title]);

  useEffect(() => {
    if (testId) {
      const fetchData = async () => {
        const res = await getListeningTest(testId, testSection);
        setData(res.data);
      };
      fetchData();
    }
  }, [testId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 py-10">
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <h2 className="text-lg font-semibold">{data.title}</h2>
          <ButtonOutPage />
        </div>
        <p>{data.test_kit.label}</p>
      </div>
      <div className="flex gap-6">
        <Tabs
          value={part || data[testSection][0].name}
          className="border rounded-lg p-5 flex gap-4 flex-col flex-grow"
        >
          <TabsHeader className="flex py-2 bg-white opacity w-1/2 border">
            {data[testSection].map(({ name }) => (
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
            {data[testSection].map((data, index) => (
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
                {/* <div className="flex flex-col "> */}
                <div className="flex gap-5 max-h-[750px]">
                  <div
                    id="topic"
                    className="w-2/3 bg-gray-100 text-gray-900 p-4 font-medium rounded-md overflow-y-scroll"
                  >
                    <Topic data={data} />
                  </div>
                  <Questions data={data} part={index} />
                </div>
                {/* </div> */}
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
          <Answer testSection={testSection} data={data} />
        </div>
      </div>
    </div>
  );
}
