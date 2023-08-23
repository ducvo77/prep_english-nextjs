"use client";

import { Button, Input } from "@material-tailwind/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import addBlog from "@/app/lib/addBlog";
import { useSession } from "next-auth/react";
import uploadImg from "@/app/lib/uploadImg";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  // table: true, // disable table module
};

export default function PostBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [isError, setIsError] = useState(false);
  const { data: session }: any = useSession();
  const handleSelectImg = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setImageFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
      }
    },
    []
  );

  const handlePostBlog = useCallback(async () => {
    if (!title || !content || !session || !imageFile) {
      toast.error("Thất bại!!");
      setIsError(true);
      return;
    }
    const res1 = await uploadImg(imageFile);
    if (!res1) {
      toast.error("Thất bại!!");
      return;
    }
    const res2 = await addBlog(
      title,
      content,
      session?.user.name,
      res1.data[0].id,
      session?.user.jwt
    );
    if (res2) {
      setIsError(false);
      setTitle("");
      setContent("");
      setImageUrl("");
      toast.success("Thành công!!");
    }
  }, [imageFile, title, content, session]);

  return (
    <div className="flex flex-col gap-6">
      <Input
        type="text"
        label="Title"
        className="text-white "
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        modules={modules}
      />
      <div className="flex gap-6 flex-col">
        <input
          type="file"
          accept="image/*"
          onChange={handleSelectImg}
          id="blog-img"
          className="hidden"
        />
        <label
          htmlFor="blog-img"
          className={`w-[250px] h-[250px] border ${
            imageUrl ? "border-solid" : "border-dashed"
          } flex items-center justify-center cursor-pointer overflow-hidden`}
        >
          {!imageUrl && <AiOutlineCloudUpload size={30} />}
          {imageUrl && (
            <Image
              alt="Banner bài viết"
              src={imageUrl}
              width={100}
              height={100}
              className="w-full"
            />
          )}
        </label>
      </div>
      {isError && (
        <span className="text-center italic text-red-300">
          Vui lòng nhập đủ dữ liệu
        </span>
      )}
      <Button onClick={handlePostBlog}>Post Blog</Button>
    </div>
  );
}
