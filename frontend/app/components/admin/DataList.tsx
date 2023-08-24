"use client";

import deleteBlog from "@/app/lib/admin/deleteBlog";
import deleteImg from "@/app/lib/admin/deleteImg";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ButtonOutPage from "../ButtonOutPage";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["no", "title", "Author", "Publish date", "Actions"];

interface DataListProps {
  blogList?: Blog[];
  testList?: TestList[];
}

export default function DataList({ blogList, testList }: DataListProps) {
  const [data, setData] = useState<Blog[] | TestList[]>([]);
  const { data: session }: any = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isPageBlog = pathname?.includes("blogs");
  useEffect(() => {
    if (isPageBlog && blogList) {
      setData(blogList);
    } else if (testList) {
      setData(testList);
    }
  }, [isPageBlog, blogList, testList]);

  const handleDeleteBlog = async (blogId: number, imgId: number) => {
    const [res1, res2] = await Promise.all([
      deleteBlog(blogId, session.user.jwt),
      deleteImg(imgId, session.user.jwt),
    ]);
    if (res1 && res2) {
      toast.success("Thành công !!");
      router.refresh();
    } else {
      toast.success("Thất bại !!");
    }
  };

  const handleDeleteTest = async () => {};

  const sortData = data.sort((a, b) => b.id - a.id);

  if (data.length === 0) return <div>Loading</div>;

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
          {sortData.map(
            ({ title, author, createdAt, id, imageURL }: any, index) => {
              const className =
                "p-3 border-b border-[#515151] text-center bg-[#1F2A40]";
              const dateObject = new Date(createdAt);
              const day = dateObject.getUTCDate();
              const month = dateObject.getUTCMonth() + 1;
              const year = dateObject.getUTCFullYear();
              const formattedDateString = `${day}/${month}/${year}`;

              return (
                <tr key={id}>
                  <td className={className}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-white"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-white"
                    >
                      {title}
                    </Typography>
                  </td>

                  <td className={className}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-white"
                    >
                      {author}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-white"
                    >
                      {formattedDateString}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-white flex gap-2 items-center justify-center"
                    >
                      <ButtonOutPage
                        color="red"
                        className="py-2 px-4"
                        title="Bạn muốn xóa?"
                        subTitle="Bạn sẽ không khôi phục được?"
                        onClick={
                          isPageBlog
                            ? () => handleDeleteBlog(id, imageURL[0].id)
                            : () => handleDeleteTest()
                        }
                      >
                        <span>Delete</span>
                      </ButtonOutPage>

                      <Button
                        className="py-2 px-4"
                        color="green"
                        onClick={() => router.push(pathname + "/edit/" + id)}
                      >
                        Detail
                      </Button>
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}
