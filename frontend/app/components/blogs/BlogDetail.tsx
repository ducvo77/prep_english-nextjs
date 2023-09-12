interface BlogDetailProps {
  data: Blog;
}

export default function BlogDetail({ data }: BlogDetailProps) {
  return (
    <div
      id="blog-detail"
      className="md:ml-[300px] sm:ml-[200px] md:pl-10 sm:pl-4"
    >
      <h1 className="uppercase font-semibold text-center text-2xl mb-4">
        {data.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: data.content }}
        className="text-justify"
      />
    </div>
  );
}
