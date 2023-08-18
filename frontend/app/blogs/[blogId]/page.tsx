import BlogDetail from "@/app/components/blogs/BlogDetail";
import SideBarBlog from "@/app/components/blogs/SideBarBlog";
import getBlog from "@/app/lib/getBlog";
import getBlogList from "@/app/lib/getBlogList";
import { Metadata } from "next";
import Image from "next/image";

interface BlogPageProps {
  params: {
    blogId: string;
  };
}

interface BlogDataType {
  data: Blog;
}

interface BlogListDataType {
  data: Blog[];
}

export async function generateMetadata({
  params: { blogId },
}: BlogPageProps): Promise<Metadata> {
  const blogData: Promise<BlogDataType> = getBlog(blogId);
  const blog = await blogData;
  return {
    title: "Bài viết: " + blog.data.title,
  };
}

export default async function BlogPage({ params: { blogId } }: BlogPageProps) {
  const blogData: Promise<BlogDataType> = getBlog(blogId);
  const blogListData: Promise<BlogListDataType> = getBlogList();
  const [blog, blogList] = await Promise.all([blogData, blogListData]);

  return (
    <div className="relative py-4 ">
      <SideBarBlog data={blogList.data} />
      <BlogDetail data={blog.data} />
    </div>
  );
}
