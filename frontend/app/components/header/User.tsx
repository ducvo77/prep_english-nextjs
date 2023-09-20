"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserProps {
  userData: CurrentUser;
}

export default function User({ userData }: UserProps) {
  const router = useRouter();
  const itemClassname =
    "flex items-center w-full px-5 py-3 hover:bg-secondary hover:text-white gap-2";
  return (
    <Menu>
      <MenuHandler>
        <div className="p-2 flex items-center gap-3 rounded-full border shadow-sm hover:shadow-lg cursor-pointer">
          <AiOutlineMenu size={20} />
          <Image
            src={
              userData?.avatar
                ? process.env.NEXT_PUBLIC_SOURCE_URL + userData.avatar[0].url
                : "/images/user-default.jpg"
            }
            width="28"
            height="28"
            alt="user"
            className="rounded-full w-8 h-8"
            unoptimized
          />
        </div>
      </MenuHandler>

      <MenuList className="flex flex-col rounded-lg p-0 min-w-[120px]">
        {!userData ? (
          <MenuItem className="p-0">
            <div
              onClick={() => router.push("/login")}
              className={itemClassname}
            >
              <span>Đăng nhập</span>
            </div>
            <div
              onClick={() => router.push("/register")}
              className={itemClassname}
            >
              <span>Đăng ký</span>
            </div>
          </MenuItem>
        ) : (
          <MenuItem className="p-0">
            <div
              onClick={() => router.push("/profile")}
              className={itemClassname}
            >
              <CgProfile size={20} />
              <span>Profile</span>
            </div>
            <div onClick={() => signOut()} className={itemClassname}>
              <GoSignOut size={20} />
              <span>Đăng xuất</span>
            </div>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
