import PostBlog from "@/app/components/admin/PostBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Add Blog",
};

export default function page() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center uppercase font-semibold text-3xl">ADD BLOG</h1>
      <PostBlog />
    </div>
  );
}
