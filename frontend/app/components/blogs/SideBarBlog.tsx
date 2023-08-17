"use client";

import { Card, List, ListItem } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";

interface SideBarBlogProps {
  data: Blog[];
}

export default function SideBarBlog({ data }: SideBarBlogProps) {
  const [active, setActive] = useState(true);
  return (
    <div className="h-auto border w-[300px] fixed top-[100px]">
      <Card className="w-full">
        <h2 className="text-center text-lg font-semibold text-gray-900">
          Bài viết liên quan
        </h2>
        <List>
          {data.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="text-light-blue-500"
            >
              <ListItem>{index + 1 + ". " + blog.title}</ListItem>
            </Link>
          ))}
        </List>
      </Card>
    </div>
  );
}
