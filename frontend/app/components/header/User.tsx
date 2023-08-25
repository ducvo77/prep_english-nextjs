"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function User() {
  const { data: session }: any = useSession();
  const router = useRouter();

  return (
    <Menu>
      <MenuHandler>
        <div className="p-2 flex items-center gap-3 rounded-full border shadow-sm hover:shadow-lg cursor-pointer">
          <AiOutlineMenu size={20} />
          <Image
            src={
              session?.user.picture
                ? session?.user.picture
                : "/images/user-default.jpg"
            }
            width="28"
            height="28"
            alt="user"
            className="rounded-full"
          />
        </div>
      </MenuHandler>

      <MenuList className="flex flex-col rounded-lg p-0 min-w-[120px]">
        {!session?.user ? (
          <MenuItem className="p-0">
            <div
              onClick={() => router.push("/login")}
              className="flex items-center w-full px-5 py-3 hover:bg-primary hover:text-white gap-2"
            >
              <span>Đăng nhập</span>
            </div>
            <div
              onClick={() => router.push("/register")}
              className="flex items-center w-full px-5 py-3 hover:bg-primary hover:text-white gap-2"
            >
              <span>Đăng ký</span>
            </div>
          </MenuItem>
        ) : (
          <MenuItem className="p-0">
            <div
              onClick={() => signOut()}
              className="flex items-center w-full px-5 py-3 hover:bg-primary hover:text-white gap-2"
            >
              <GoSignOut size={20} />
              <span>Đăng xuất</span>
            </div>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
