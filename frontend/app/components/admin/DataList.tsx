"use client";

import deleteBlog from "@/app/lib/admin/blog/deleteBlog";
import deleteImg from "@/app/lib/admin/img/deleteImg";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ButtonOutPage from "../ButtonOutPage";
import { useCallback, useEffect, useMemo, useState } from "react";
import deleteTopic from "@/app/lib/admin/topic/deleteTopic";
import deleteTest from "@/app/lib/admin/test/deleteTest";
import Pagination from "../Pagination";

const TABLE_HEAD = ["no", "title", "Author", "Publish date", "Actions"];

interface DataListProps {
  blogList?: Blog[];
  testList?: Test[];
  topicList?: Topic[];
}

export default function DataList({
  blogList,
  testList,
  topicList,
}: DataListProps) {
  const [active, setActive] = useState(1);
  const [data, setData] = useState<Blog[] | Test[] | Topic[]>([]);
  const { data: session }: any = useSession();
  const jwt = useMemo(() => session?.user.jwt, [session]);
  const router = useRouter();
  const pathname = usePathname();
  const isPageBlog = pathname?.includes("blogs");
  const isPageTest = pathname?.includes("tests");
  const isPageTopic = pathname?.includes("topics");
  useEffect(() => {
    if (blogList && isPageBlog) {
      setData(blogList);
    }
    if (testList && isPageTest) {
      setData(testList);
    }
    if (topicList && isPageTopic) {
      setData(topicList);
    }
  }, [isPageBlog, blogList, testList, topicList, isPageTest, isPageTopic]);

  const handleDeleteBlog = useCallback(
    async (blogId: number, imgId: number) => {
      const [res1, res2] = await Promise.all([
        deleteBlog(blogId, jwt),
        deleteImg(imgId, jwt),
      ]);
      if (res1 && res2) {
        toast.success("Thành công !!");
        router.refresh();
      } else {
        toast.success("Thất bại !!");
      }
    },
    [jwt, router]
  );

  const handleDeleteTest = useCallback(
    async (id: number) => {
      const res = await deleteTest(id, jwt);
      if (res) {
        toast.success("Thành công !!");
        router.refresh();
      }
    },
    [jwt, router]
  );

  const handleDeleteTopic = useCallback(
    async (id: number) => {
      const res = await deleteTopic(id, jwt);
      if (res) {
        toast.success("Thành công");
        router.refresh();
      }
    },
    [jwt, router]
  );

  const sortData = data.sort((a, b) => b.id - a.id);

  if (data.length === 0) return <div>Loading...</div>;

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
                Math.ceil((index + 1) / 10) === active && (
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
                            (isPageBlog &&
                              (() => handleDeleteBlog(id, imageURL[0].id))) ||
                            (isPageTest && (() => handleDeleteTest(id))) ||
                            (isPageTopic && (() => handleDeleteTopic(id))) ||
                            (() => {})
                          }
                        >
                          <span>Delete</span>
                        </ButtonOutPage>

                        <Button
                          className="py-2 px-4"
                          color="green"
                          onClick={() => router.push(pathname + "/edit/" + id)}
                        >
                          Edit
                        </Button>
                      </Typography>
                    </td>
                  </tr>
                )
              );
            }
          )}
        </tbody>
      </table>
      <Pagination
        active={active}
        setActive={setActive}
        length={sortData.length}
        count={10}
      />
    </Card>
  );
}
