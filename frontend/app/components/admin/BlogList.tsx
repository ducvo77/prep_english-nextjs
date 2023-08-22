"use client";

import { Button, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["no", "title", "Actions"];

interface BlogListProps {
  data: Blog[];
}

export default function BlogList({ data }: BlogListProps) {
  return (
    <Card className="h-full w-full overflow-scroll text-[#E0E0E0]">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-[#3E4396] p-4 uppercase text-center "
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 text-white"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ title, id }, index) => (
            <tr key={id}>
              <td className="p-3 border-b border-[#515151] text-center bg-[#1F2A40] ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-white"
                >
                  {index + 1}
                </Typography>
              </td>
              <td className="p-3 border-b border-[#515151] text-center bg-[#1F2A40] ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-white"
                >
                  {title}
                </Typography>
              </td>

              <td className="p-3 border-b border-[#515151] text-center bg-[#1F2A40] ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-white flex gap-2 items-center justify-center"
                >
                  <Button>Xóa</Button>
                  <Button>Sửa</Button>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
