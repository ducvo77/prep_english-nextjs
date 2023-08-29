//https://dribbble.com/shots/17219796-My-details-settings-page-Untitled-UI
"use client";
import { Button, Input } from "@material-tailwind/react";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col mx-20 gap-10">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <Image
            src={"/images/user-default.jpg"}
            alt="avatar"
            width={150}
            height={150}
            className="border-2 border-white rounded-full shadow-md"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Võ Công Đức</h3>
            <span className="text-sm text-gray-800">Đây là dòng bio</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outlined" className="min-w-[100px]">
            Hủy
          </Button>
          <Button color="green" className="min-w-[100px]">
            Lưu
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex border-b py-6">
          <span className="w-2/5">Username</span>
          <Input type="text" label="Username" />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Họ và tên</span>
          <Input type="text" label="Nhập tên" />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Email</span>
          <Input type="text" label="Email" />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Bio</span>
          <Input type="text" label="Nhập Bio" />
        </div>
        <div className="flex border-b py-6">
          <span className="w-2/5">Avatar</span>
          <div className="flex gap-6">
            <label
              htmlFor=""
              className="w-[200px] h-[200px] border-black border border-dashed"
            ></label>
            <input type="file" accept="images/*" />
          </div>
        </div>
      </div>
    </div>
  );
}
