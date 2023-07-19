"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function User() {
  return (
    <Menu>
      <MenuHandler>
        <button className="p-2 flex items-center gap-3 border rounded-full shadow-sm hover:shadow-lg">
          <AiOutlineMenu size={20} />
          <Image
            src="/images/user-default.jpg"
            width="28"
            height="28"
            alt="user"
            className="rounded-full"
          />
        </button>
      </MenuHandler>
      <MenuList className="flex flex-col rounded-lg p-0 min-w-[120px]">
        <MenuItem className="text-left px-5 py-3 hover:bg-[#FFEB3B]">
          <Link href="/login">Đăng nhập</Link>
        </MenuItem>
        <MenuItem className="text-left px-5 py-3 hover:bg-[#FFEB3B]">
          <Link href="/register">Đăng ký</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
