import ContainerContent from "@/app/components/admin/ContainerContent";
import DataList from "@/app/components/admin/DataList";
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
    <ContainerContent label="blog list">
      <DataList blogList={blogList.data} />
    </ContainerContent>
  );
}
