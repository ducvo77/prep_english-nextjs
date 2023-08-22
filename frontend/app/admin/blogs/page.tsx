import BlogList from "@/app/components/admin/BlogList";
import getBlogList from "@/app/lib/getBlogList";

interface BlogListData {
  data: Blog[];
}

export default async function Page() {
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
