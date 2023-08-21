"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import { AiOutlineMenu, AiOutlinePlusCircle } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { SiAdminer } from "react-icons/si";
import { signOut, useSession } from "next-auth/react";
import { CiLogin } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function User() {
  const { data: session }: any = useSession();
  const router = useRouter();

  return (
    <Menu>
      <MenuHandler>
        <button className="p-2 flex items-center gap-3 rounded-full border shadow-sm hover:shadow-lg">
          <AiOutlineMenu size={20} />
          <Image
            src={
              session?.user.picture
                ? session.user.picture
                : "/images/user-default.jpg"
            }
            width="28"
            height="28"
            alt="user"
            className="rounded-full"
          />
        </button>
      </MenuHandler>

      <MenuList className="flex flex-col rounded-lg p-0 min-w-[120px]">
        {!session?.user ? (
          <MenuItem className="p-0">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center w-full px-5 py-3 hover:bg-primary hover:text-white gap-2"
            >
              {/* <CiLogin size={20} /> */}
              <span>Đăng nhập</span>
            </button>
            <button
              onClick={() => router.push("/register")}
              className="flex items-center w-full px-5 py-3 hover:bg-primary hover:text-white gap-2"
            >
              {/* <AiOutlinePlusCircle size={20} /> */}
              <span>Đăng ký</span>
            </button>
          </MenuItem>
        ) : (
          <MenuItem className="p-0">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center w-full px-5 py-3 hover:bg-primary hover:text-white gap-2"
            >
              <SiAdminer size={20} />
              <span>Admin</span>
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-5 py-3 hover:bg-primary hover:text-white gap-2"
            >
              <GoSignOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
