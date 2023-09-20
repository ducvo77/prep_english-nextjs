"use client";

import { useRouter } from "next/navigation";
import { Fragment, memo, useCallback, useState } from "react";
import { getInfoTest } from "../../redux/features/infoTestSlice";
import { useAppDispatch } from "../../redux/hook";
import ButtonOutPage from "../ButtonOutPage";
import ContainerGrid from "../ContainerGrid";

interface TestListProps {
  data: Topic[];
}

function TestList({ data }: TestListProps) {
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
    <>
      <ContainerGrid>
        {data.map((topic, index) => (
          <Fragment key={topic.id}>
            {topic.tests.map(
              ({ id, title, time, part_number, question_number }) => (
                <div
                  key={id}
                  className="border h-auto p-4 rounded-lg bg-light flex flex-col gap-3"
                >
                  <h3 className="font-medium text-black text-base">{title}</h3>
                  <div className="flex flex-col gap-1 text-primary opacity-80 text-sm font-normal">
                    <span>{topic.title}</span>
                    <div className="flex gap-1">
                      <span className="border-r-[1px] border-primary pr-1">
                        {time} phút
                      </span>
                      <span className="border-r-[1px] border-primary pr-1">
                        {part_number} phần thi
                      </span>
                      <span>{question_number} câu hỏi</span>
                    </div>
                  </div>

                  <ButtonOutPage
                    onClick={() =>
                      handleClickTest(id, title, topic.title, question_number)
                    }
                    variant="outlined"
                    className="text-sm border-secondary hover:border-secondary hover:bg-secondary py-2 hover:text-white text-black normal-case font-medium hover:opacity-100"
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
    </>
  );
}

export default memo(TestList);
