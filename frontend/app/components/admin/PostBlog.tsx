"use client";

import { Button, Input, Textarea } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

export default function PostBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const { data: session }: any = useSession();
  //   console.log(session);

  const handleSubmit = useCallback(() => {
    console.log("title: ", title);
    console.log("content: ", content);
    console.log("url: ", url);
    console.log("name: ", session.user.name);
  }, [title, content, url, session]);

  return (
    <div className="flex flex-col gap-10">
      <h1>Đăng bài viết ở đây!!</h1>
      <Input label="Tiêu đề" onChange={(e) => setTitle(e.target.value)} />
      <Textarea label="Nội dung" onChange={(e) => setContent(e.target.value)} />
      <input
        type="file"
        name="blog"
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleSubmit}>Nộp</Button>
    </div>
  );
}
