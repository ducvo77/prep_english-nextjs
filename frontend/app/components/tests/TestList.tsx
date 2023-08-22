"use client";

import { Button } from "@material-tailwind/react";

import { useRouter } from "next/navigation";
import { Fragment, useCallback } from "react";
import { getInfoTest } from "../../redux/features/infoTestSlice";
import { useAppDispatch } from "../../redux/hook";
import ButtonOutPage from "../ButtonOutPage";
import ContainerGrid from "../ContainerGrid";

export default function TestList({ data }: TestList) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClickTest = useCallback(
    (id: number, title: string, label: string, question_number: number) => {
      router.push(`/tests/${id}`);
      dispatch(getInfoTest({ id, title, label, question_number }));
    },

    [router, dispatch]
  );

  return (
    <ContainerGrid>
      {data.map(({ id, label, tests }) => (
        <Fragment key={id}>
          {tests.map(
            ({ id, title, time, part_number, question_number, hastags }) => (
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
                      className="text-[0.75rem] text-link cursor-pointer uppercase"
                    >
                      {hastag}
                    </span>
                  ))}
                </div>
                <ButtonOutPage
                  onClick={() =>
                    handleClickTest(id, title, label, question_number)
                  }
                  variant="outlined"
                  className="font-semibold border-primary hover:bg-primary py-2 hover:text-white text-primary hover:opacity-100"
                  title="Bạn muốn làm bài kiểm tra?"
                  subTitle={`Bài kiểm tra: ${title}`}
                >
                  <span>Bắt đầu</span>
                </ButtonOutPage>
              </div>
            )
          )}
        </Fragment>
      ))}
    </ContainerGrid>
  );
}
