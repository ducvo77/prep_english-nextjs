interface BlogDetailProps {
  data: Blog;
}

export default function BlogDetail({ data }: BlogDetailProps) {
  return (
    <div id="blog-detail" className="ml-[300px] pl-10">
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
