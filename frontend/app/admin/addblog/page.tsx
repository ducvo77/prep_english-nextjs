import ContainerContent from "@/app/components/admin/ContainerContent";
import PostBlog from "@/app/components/admin/PostBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Add Blog",
};

export default function page() {
  return (
    <ContainerContent label="Add blog">
      <PostBlog />
    </ContainerContent>
  );
}
