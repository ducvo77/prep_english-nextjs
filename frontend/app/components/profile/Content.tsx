"use client";

import deleteFile from "@/app/lib/admin/upload/deleteFile";
import uploadFile from "@/app/lib/admin/upload/uploadFile";
import updateInfoCurrentUser from "@/app/lib/updateInfoCurrentUser";
import { Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
interface ContentProps {
  userData: CurrentUser;
}

export default function Content({ userData }: ContentProps) {
  const [name, setName] = useState(userData.name || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState({});
  const router = useRouter();
  const { data: session }: any = useSession();
  const jwt = useMemo(() => session?.user?.jwt, [session]);

  const handleChangeAvatar = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setImageFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
      }
    },
    []
  );

  const handleSave = async () => {
    if (name === userData.name && bio === userData.bio && !imageUrl) {
      toast.error("Chưa có sự thay đổi!");
      return;
    }
    let resImage = undefined;
    if (imageUrl) {
      resImage = await uploadFile(imageFile, jwt);

      if (resImage && userData.avatar) {
        await deleteFile(userData.avatar[0].id, jwt);
      }
    }
    let resInfo = null;
    if (name || bio || resImage) {
      resInfo = await updateInfoCurrentUser(
        userData.id,
        name || userData.name,
        bio || userData.bio,
        resImage?.data[0].id ||
          (userData.avatar ? userData.avatar[0].id : null),
        jwt
      );
    }
    if (resInfo || resImage) {
      toast.success("Thành công!");
      // setName("");
      // setBio("");
      // setImageUrl("");
      router.refresh();
    }
  };

  const handleCancel = () => {
    setName(userData.name || "");
    setBio(userData.bio || "");
    setImageUrl("");
  };

  return (
    <div className="flex flex-col xl:mx-20 lg:mx-12 md:mx-6 sm:mx-4 mx-2  gap-10">
      <div className="flex sm:flex-row flex-col gap-10 justify-between items-center ">
        <div className="flex items-center gap-3 px-10">
          <Image
            src={
              userData.avatar
                ? process.env.NEXT_PUBLIC_SOURCE_URL + userData.avatar[0].url
                : "/images/user-default.jpg"
            }
            alt="avatar"
            width={150}
            height={150}
            unoptimized={true}
            className="border-2 border-white rounded-full shadow-md overflow-hidden w-[150px] h-[150px]"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">
              {userData.name || "Chưa cập nhật"}
            </h3>
            <span className="text-sm text-gray-800">{userData.bio}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            className="min-w-[100px]"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button color="green" className="min-w-[100px]" onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex border-b py-6">
          <span className="w-2/5">Username</span>
          <Input
            type="text"
            disabled
            label="Username"
            value={userData.username}
          />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Họ và tên</span>
          <Input
            type="text"
            label="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Email</span>
          <Input disabled type="email" label="Email" value={userData.email} />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Bio</span>
          <Input
            type="text"
            label="Nhập Bio của bạn"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Avatar</span>
          <div className="flex gap-6">
            <label
              htmlFor="profile-logo"
              className={`w-[200px] h-[200px] border-black border${
                imageUrl || userData.avatar ? "" : " border-dashed"
              } flex items-center justify-center cursor-pointer overflow-hidden`}
            >
              {!imageUrl && !userData.avatar && (
                <AiOutlineCloudUpload size={40} />
              )}
              {(imageUrl || userData.avatar) && (
                <Image
                  src={
                    imageUrl ||
                    (userData.avatar
                      ? process.env.NEXT_PUBLIC_SOURCE_URL +
                        userData.avatar[0].url
                      : "")
                  }
                  alt="avatar"
                  width={200}
                  height={200}
                  unoptimized={true}
                />
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-logo"
              className="hidden"
              onChange={handleChangeAvatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
