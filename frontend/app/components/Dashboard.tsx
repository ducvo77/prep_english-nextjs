"use client";

import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
  "STT",
  "Bài thi",
  "Thời gian thi",
  "Số câu đúng",
  "Phần trăm chính xác",
  "",
];

const TABLE_ROWS = [
  {
    id: 1,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 2,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 3,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 4,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 5,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 6,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 7,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 8,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 9,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 10,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
  {
    id: 11,
    title: "C18 IELTS listening test 1",
    time: "10:00",
    number_correct: 10,
    total_sentences: 40,
  },
];

export default function Dashboard() {
  const [active, setActive] = useState(1);

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "blue" : "blue-gray",
      onClick: () => setActive(index),
      className: "rounded-full",
    } as any);

  const next = () => {
    if (active === Math.ceil(TABLE_ROWS.length / 5)) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <Card className="h-full w-full min-h-[400px]">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="leading-none text-base font-semibold"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            ({ id, title, time, number_correct, total_sentences }, index) =>
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
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {time}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {number_correct + " / " + total_sentences}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {(number_correct / total_sentences) * 100 + "%"}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue"
                        className="font-medium"
                      >
                        Xem lại
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
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Trang trước
        </Button>
        <div className="flex items-center gap-2">
          {TABLE_ROWS.map(
            ({ id }, index) =>
              index % 5 === 0 && (
                <IconButton
                  key={id}
                  {...getItemProps(Math.ceil((index + 1) / 5))}
                >
                  {Math.ceil((index + 1) / 5)}
                </IconButton>
              )
          )}
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={active === Math.ceil(TABLE_ROWS.length / 5)}
        >
          Trang sau
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
