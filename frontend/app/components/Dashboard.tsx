"use client";

import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import React, { useCallback, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import deleteTestHistory from "../lib/deleteTestHistory";
import toast from "react-hot-toast";
import ButtonOutPage from "./ButtonOutPage";

const TABLE_HEAD = [
  "STT",
  "Bài thi",
  "Thời gian thi",
  "Số câu đúng",
  "Phần trăm chính xác",
  "",
];

interface DashboardProps {
  data: TestHistory;
}

export default function Dashboard({ data }: DashboardProps) {
  const [active, setActive] = useState(1);
  const router = useRouter();

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "blue" : "blue-gray",
      onClick: () => setActive(index),
      className: "rounded-full",
    } as any);
  const handleDeleteTestHistory = useCallback(
    async (id: number) => {
      const res = await deleteTestHistory(id);
      if (res?.status === 200) {
        router.refresh();
        toast.success("Xóa thành công!!");
      } else {
        toast.error("Xóa thất bại!!");
      }
    },
    [router]
  );
  const next = () => {
    if (active === Math.ceil(data.training_histories.length / 5)) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const sortData = data.training_histories.sort((a, b) => b.id - a.id);

  return (
    <Card className="h-full w-full min-h-[500px] overflow-x-scroll">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${
                  index === 4 ? "md:table-cell hidden" : ""
                } ${index === 2 || index === 3 ? "sm:table-cell hidden" : ""}`}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={`leading-none text-base font-semibold`}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortData.map(
            (
              { id, title, time, number_correct, total_sentences, testId },
              index
            ) =>
              active === Math.ceil((index + 1) / 5) && (
                <React.Fragment key={id}>
                  <tr className="even:bg-blue-gray-50/50 text-center">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className="p-4 sm:table-cell hidden">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {time}
                      </Typography>
                    </td>
                    <td className="p-4 sm:table-cell hidden">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {number_correct + " / " + total_sentences}
                      </Typography>
                    </td>
                    <td className="p-4 md:table-cell hidden">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {((number_correct / total_sentences) * 100).toFixed(0) +
                          "%"}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="font-medium flex gap-6 text-primary"
                      >
                        <Button
                          onClick={() =>
                            router.push(`/tests/${testId}/results/${id}`)
                          }
                          className="py-3 px-5"
                        >
                          Xem lại
                        </Button>
                        <ButtonOutPage
                          title="Bạn chắc chắn muốn xóa?"
                          subTitle="Lịch sử sẽ không được khôi phục?"
                          onClick={() => handleDeleteTestHistory(id)}
                          className="bg-red-600 py-3 px-5"
                        >
                          <span>Xóa</span>
                        </ButtonOutPage>
                      </Typography>
                    </td>
                  </tr>
                </React.Fragment>
              )
          )}
        </tbody>
      </table>
      <div className="flex items-center gap-4 justify-center py-3 absolute bottom-0 left-0 right-0">
        <Button
          variant="text"
          color="blue-gray"
          className="sm:flex hidden items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Trang trước
        </Button>
        <div className="flex items-center gap-2">
          {data.training_histories.map(
            ({ id }, index) =>
              index % 5 === 0 && (
                <IconButton
                  key={id}
                  {...getItemProps(Math.ceil((index + 1) / 5))}
                  className={`rounded-full text-sm text-white ${
                    active === Math.ceil((index + 1) / 5)
                      ? "bg-primary hover:bg-primary "
                      : "bg-second hover:bg-primary"
                  }`}
                >
                  {Math.ceil((index + 1) / 5)}
                </IconButton>
              )
          )}
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="sm:flex hidden items-center gap-2 rounded-full"
          onClick={next}
          disabled={
            active === Math.ceil(data.training_histories.length / 5) ||
            data.training_histories.length === 0
          }
        >
          Trang sau
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
