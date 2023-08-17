import Image from "next/image";

interface BlogDetailProps {
  data: Blog;
}

export default function BlogDetail({ data }: BlogDetailProps) {
  return (
    <div id="blog" className="ml-[300px] pl-10">
      <h1 className="uppercase font-semibold text-center text-2xl mb-10">
        {data.title}
      </h1>
      <p className="italic text-justify mb-1">{data.introduction.content}</p>
      <Image
        src={process.env.SOURCE_URL + data.imageURL[0].url}
        width={10000}
        height={10000}
        alt="Banner Blog"
        unoptimized
      />

      {data.content.map((item, index) => (
        <div key={item.sectionTitle + index}>
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
