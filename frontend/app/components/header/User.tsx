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
import { GoSignOut } from "react-icons/go";
import { signOut, useSession } from "next-auth/react";

export default function User() {
  const { data: session }: any = useSession();

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
          <>
            <MenuItem className="text-left p-0 flex">
              <Link
                href="/login"
                className="w-full px-5 py-3 hover:bg-[#1A56DB] hover:text-white"
              >
                Đăng nhập
              </Link>
            </MenuItem>
            <MenuItem className="text-left p-0 flex">
              <Link
                href="/register"
                className="w-full px-5 py-3 hover:bg-[#1A56DB] hover:text-white"
              >
                Đăng ký
              </Link>
            </MenuItem>
          </>
        ) : (
          <MenuItem className="p-0" onClick={() => signOut()}>
            <button className="flex items-center w-full px-5 py-3 hover:bg-[#1A56DB] hover:text-white gap-2">
              <GoSignOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
