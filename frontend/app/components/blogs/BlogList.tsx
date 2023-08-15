"use client";

import ContainerGrid from "../ContainerGrid";
import BlogCard from "./BlogCard";

interface BlogListProp {
  data: Blog[];
}

export default function BlogList({ data }: BlogListProp) {
  return (
    <ContainerGrid>
      {data.map((blog) => (
        <BlogCard key={blog.id} data={blog} />
      ))}
    </ContainerGrid>
  );
}
