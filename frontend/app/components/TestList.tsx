// "use client";

import { Button } from "@material-tailwind/react";

import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import getTestKits from "../actions/getTestKits";
import { useDispatch } from "react-redux";
import { getLabelTest, getTitleTest } from "../redux/features/infoTestSlice";
interface Testlist {
  id: number;
  label: string;
  tests: {
    id: number;
    title: string;
    time: number;
    part_number: number;
    question_number: number;
    href: string;
    hastags: [string];
  }[];
}
export default function TestList() {
  const router = useRouter();
  const [testList, setTestList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestKits();
      setTestList(res.data);
    };
    fetchData();
  }, []);

  const handleClickTest = useCallback(
    (title: string, label: string, href: string) => {
      router.push(href);
      dispatch(getTitleTest({ title }));
      dispatch(getLabelTest({ label }));
    },

    [router, dispatch]
  );

  if (!testList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-6 lg:gap-4 md:gap-2 gap-1">
      {testList.map(({ id, label, tests }: Testlist) => (
        <Fragment key={id}>
          {tests.map(
            ({
              id,
              title,
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
                  {hastags.map((hastag, index) => (
                    <span
                      key={index}
                      className="text-[0.75rem] text-[#1A56DB] cursor-pointer uppercase"
                    >
                      {hastag}
                    </span>
                  ))}
                </div>
                <Button
                  onClick={() => handleClickTest(title, label, href)}
                  variant="outlined"
                  className="font-semibold second-color border-[#1A56DB] hover:bg-[#1A56DB] hover:text-white py-2"
                >
                  Bắt đầu
                </Button>
              </div>
            )
          )}
        </Fragment>
      ))}
    </div>
  );
}
