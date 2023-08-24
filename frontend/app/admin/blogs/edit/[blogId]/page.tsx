import ContainerContent from "@/app/components/admin/ContainerContent";
import PostBlog from "@/app/components/admin/PostBlog";
import getBlog from "@/app/lib/getBlog";

interface EditBlogProps {
  params: {
    blogId: string;
  };
}

interface BlogData {
  data: Blog;
}

export default async function page({ params: { blogId } }: EditBlogProps) {
  const blogData: Promise<BlogData> = getBlog(blogId);
  const blog = await blogData;

  return (
    <ContainerContent label="Edit blog">
      <PostBlog data={blog.data} blogId={blogId} />
    </ContainerContent>
  );
}
