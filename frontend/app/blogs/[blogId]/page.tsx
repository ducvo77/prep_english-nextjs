import getBlog from "@/app/lib/getBlog";
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

export async function generateMetadata({
  params: { blogId },
}: BlogPageProps): Promise<Metadata> {
  const blogData: Promise<BlogDataType> = getBlog(blogId);
  const blog = await blogData;
  return {
    title: blog.data.title,
  };
}

export default async function BlogPage({ params: { blogId } }: BlogPageProps) {
  const blogData: Promise<BlogDataType> = getBlog(blogId);
  const blog = await blogData;

  return (
    <div id="blog" className="py-4">
      <h1 className="uppercase font-semibold text-center text-3xl mb-10">
        {blog.data.title}
      </h1>
      <p className="italic text-justify mb-1">
        {blog.data.introduction.content}
      </p>
      <Image
        src={"/images/blog-card.jpeg"}
        width={10000}
        height={10000}
        alt="Banner Blog"
      />

      {blog.data.content.map((item, index) => (
        <div key={item.sectionTitle}>
          <h2 className="font-extrabold text-2xl my-6">
            {index + 1 + ". " + item.sectionTitle}
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="text-justify"
          />
          {item.subsections.map((item, index2) => (
            <div key={item.title}>
              <h3 className="font-bold text-lg my-4">
                {index + 1 + (index2 + 1) / 10 + ". " + item.title}
              </h3>
              <p
                dangerouslySetInnerHTML={{ __html: item.content }}
                className="text-justify"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
