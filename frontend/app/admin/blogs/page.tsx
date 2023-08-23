import BlogList from "@/app/components/admin/BlogList";
import getBlogList from "@/app/lib/getBlogList";
import { Metadata } from "next";

interface BlogListData {
  data: Blog[];
}

export const metadata: Metadata = {
  title: "Admin - Blogs",
};

export default async function Blogs() {
  const blogListData: Promise<BlogListData> = getBlogList();
  const blogList = await blogListData;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center text-3xl font-semibold uppercase">
        Tổng hợp đề thi
      </h1>
      <BlogList data={blogList.data} />
    </div>
  );
}
