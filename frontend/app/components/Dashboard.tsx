"use client";

import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import React, { useCallback, useMemo, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import deleteTestHistory from "../lib/deleteTestHistory";
import toast from "react-hot-toast";
import ButtonOutPage from "./ButtonOutPage";
import { useSession } from "next-auth/react";
import Pagination from "./Pagination";

const TABLE_HEAD = [
  "STT",
  "Bài thi",
  "Thời gian thi",
  "Số câu đúng",
  "Phần trăm chính xác",
  "",
];

interface DashboardProps {
  userData: CurrentUser;
}

export default function Dashboard({ userData }: DashboardProps) {
  const [active, setActive] = useState(1);
  const router = useRouter();
  const { data: session }: any = useSession();
  const jwt = useMemo(() => session?.user?.jwt, [session]);

  const handleDeleteTestHistory = useCallback(
    async (id: number) => {
      const res = await deleteTestHistory(id, jwt);
      if (res?.status === 200) {
        router.refresh();
        toast.success("Xóa thành công!!");
      } else {
        toast.error("Xóa thất bại!!");
      }
    },
    [router, jwt]
  );

  const sortData = userData.training_histories?.sort((a, b) => b.id - a.id);

  return (
    <Card className="h-full w-full overflow-x-scroll">
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
          {sortData?.map(
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
      <Pagination
        active={active}
        setActive={setActive}
        length={sortData?.length || 0}
        count={5}
      />
    </Card>
  );
}
