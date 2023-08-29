"use client";

import { useState } from "react";
import ContainerGrid from "../ContainerGrid";
import Pagination from "../Pagination";
import BlogCard from "./BlogCard";

interface BlogListProp {
  data: Blog[];
}

export default function BlogList({ data }: BlogListProp) {
  const [active, setActive] = useState(1);
  return (
    <>
      <ContainerGrid>
        {data.map(
          (blog, index) =>
            Math.ceil((index + 1) / 4) === active && (
              <BlogCard key={blog.id} data={blog} />
            )
        )}
      </ContainerGrid>
      <Pagination
        active={active}
        setActive={setActive}
        length={data.length}
        count={4}
      />
    </>
  );
}
