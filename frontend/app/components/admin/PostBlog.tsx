"use client";

import { Button, Input } from "@material-tailwind/react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import addBlog from "@/app/lib/admin/blog/addBlog";
import { useSession } from "next-auth/react";
import uploadImg from "@/app/lib/admin/img/uploadImg";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import editUploadImg from "@/app/lib/admin/img/editUploadImg";
import editBlog from "@/app/lib/admin/blog/editBlog";
import deleteImg from "@/app/lib/admin/img/deleteImg";
import { useRouter } from "next/navigation";
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
};

interface PostBlogProps {
  data?: Blog;
  blogId?: string;
}

export default function PostBlog({ blogId, data }: PostBlogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [isError, setIsError] = useState(false);
  const { data: session }: any = useSession();
  const jwt = useMemo(() => session?.user.jwt, [session]);
  const author = useMemo(() => session.user.name, [session]);

  const router = useRouter();
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
    if (!title || !content || content === "<p><br></p>" || !imageUrl) {
      toast.error("Thất bại!!");
      setIsError(true);
      return;
    }
    const res1 = await uploadImg(imageFile, jwt);
    if (!res1) {
      toast.error("Chưa thay đổi!!");
      return;
    }
    const res2 = await addBlog(title, content, author, res1.data[0].id, jwt);
    if (res2) {
      setIsError(false);
      setTitle("");
      setContent("");
      setImageUrl("");
      toast.success("Thành công!!");
    }
  }, [imageFile, title, content, jwt, author, imageUrl]);

  const handleEditBlog = useCallback(async () => {
    if (!title && !imageUrl && !content) {
      toast.error("Thất bại !!");
      setIsError(true);
      return;
    }
    if (data && blogId) {
      let res1 = undefined;
      if (imageUrl) {
        res1 = await editUploadImg(imageFile, jwt);
      }
      if (title || content || res1) {
        if (res1) {
          const res = await deleteImg(data?.imageURL[0].id, jwt);
        }
        const res2 = await editBlog(
          blogId,
          title || data.title,
          content || data.content,
          author,
          res1?.data[0].id || data.imageURL[0].id,
          jwt
        );
        if (res2) {
          toast.success("Thành công");
          setTitle("");
          setContent("");
          setImageUrl("");
          router.refresh();
          setIsError(false);
        }
      }
    }
  }, [content, imageFile, title, jwt, author, imageUrl, blogId, data, router]);

  return (
    <div className="flex flex-col gap-6">
      <Input
        type="text"
        label="Title"
        className="text-white"
        onChange={(e) => setTitle(e.target.value)}
        value={data && !title ? data.title : title}
      />
      <ReactQuill
        value={data && !content ? data.content : content}
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
            imageUrl || data ? "border-solid" : "border-dashed"
          } flex items-center justify-center cursor-pointer overflow-hidden rounded-sm`}
        >
          {!imageUrl && !data && <AiOutlineCloudUpload size={40} />}
          {(imageUrl || data) && (
            <Image
              alt="Banner bài viết"
              src={
                data && !imageUrl
                  ? process.env.NEXT_PUBLIC_SOURCE_URL + data.imageURL[0].url
                  : imageUrl
              }
              width={100}
              height={100}
              className="w-full bg-[]"
              unoptimized={true}
            />
          )}
        </label>
      </div>
      {isError && (
        <span className="text-center italic text-red-300">
          {data ? "Chưa có sự thay đổi" : " Vui lòng nhập đủ dữ liệu"}
        </span>
      )}
      <Button onClick={data ? handleEditBlog : handlePostBlog}>
        {data ? "Edit" : "Post Blog"}
      </Button>
    </div>
  );
}
