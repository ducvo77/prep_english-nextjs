"use client";

import { Card, List, ListItem } from "@material-tailwind/react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface SideBarBlogProps {
  data: Blog[];
}

export default function SideBarBlog({ data }: SideBarBlogProps) {
  const params = useParams();

  return (
    <div className="h-auto md:w-[300px] sm:w-[200px] w-full sm:fixed top-[100px] max-h-[50vh] overflow-y-scroll shadow-md">
      <Card className="w-full py-4">
        <h2 className="text-center text-xl font-semibold text-red-700">
          Bài viết liên quan
        </h2>
        <List>
          {data.map((blog, index) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`} className="">
              <ListItem
                selected={blog.id === Number(params?.blogId)}
                className={`text-gray-900 ${
                  blog.id === Number(params?.blogId)
                    ? "text-primary bg-gray-100"
                    : ""
                }`}
              >
                {index + 1 + ". " + blog.title}
              </ListItem>
            </Link>
          ))}
        </List>
      </Card>
    </div>
  );
}
