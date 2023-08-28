"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsPostcardHeart } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { GoWorkflow } from "react-icons/go";
import { MdPostAdd } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import ButtonOutPage from "../ButtonOutPage";

const menu_list = [
  {
    label: "Dashboard",
    Icon: RxDashboard,
    href: "/admin",
  },
  {
    label: "Topics",
    Icon: RiFileListLine,
    href: "/admin/topics",
  },
  {
    label: "Tests",
    Icon: GoWorkflow,
    href: "/admin/tests",
  },
  {
    label: "BLogs",
    Icon: BsPostcardHeart,
    href: "/admin/blogs",
  },
  // {
  //   label: "Add Topic",
  //   Icon: AiOutlineFolderAdd,
  //   href: "/admin/addtopic",
  // },
  {
    label: "Add Test",
    Icon: AiOutlineFileAdd,
    href: "/admin/addtest",
  },

  {
    label: "Add Blog",
    Icon: MdPostAdd,
    href: "/admin/addblog",
  },
  // {
  //   label: "Log Out",
  //   Icon: CiLogout,
  //   href: "/",
  // },
];

interface SideBarProps {
  user: CurrentUser;
}

export default function SideBar({ user }: SideBarProps) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  return (
    <div
      className={`${
        active ? "w-[60px] px-4 py-8" : "w-[260px] p-10"
      } transition-all ease-linear duration-300 flex flex-shrink-0 flex-col gap-6 relative overflow-y-scroll bg-[#1F2A40] ${
        !active ? "border-r-4 border-[#888888]" : "border-r-0"
      } `}
    >
      <div
        className="flex justify-center items-center"
        onClick={() => setActive(!active)}
      >
        {!active && (
          <Link href={"/admin"}>
            <h1 className="text-2xl uppercase">prep english</h1>
          </Link>
        )}
        <button className="flex justify-center items-center w-10 min-w-[40px] h-10 hover:bg-[#303B4E] cursor-pointer rounded-full transition-all">
          <AiOutlineMenu />
        </button>
      </div>
      {!active && (
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/images/user-default.jpg"
            width={100}
            height={100}
            alt="Avatar"
            className="rounded-full"
          />

          <div className="flex flex-col gap-1 items-center">
            <span className="font-semibold text-xl">{user.name}</span>
            <span className="text-sm text-[#4cceac] capitalize">
              {user.role.type}
            </span>
          </div>
        </div>
      )}

      <ul className={`flex flex-col ${active ? "items-center" : "pl-6"}`}>
        {menu_list.map(({ label, Icon, href }) => (
          <Tooltip
            placement="right"
            key={label}
            content={label}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className={`${!active ? "hidden" : ""}`}
          >
            <Link
              href={href}
              className={`flex gap-3 items-center py-3 text-sm hover:text-[#6770FA] cursor-pointer ${
                href === pathname ? "text-[#6770FA]" : ""
              }`}
            >
              <Icon size={16} />
              {!active && <span>{label}</span>}
            </Link>
          </Tooltip>
        ))}
      </ul>

      <ButtonOutPage
        onClick={() => signOut()}
        className={`p-0 border-0 focus:ring-0 text-[#E0E0E0] flex gap-3 ${
          active ? " justify-center" : "pl-6"
        } items-center text-sm hover:text-[#6770FA]`}
        title="Thoát?"
        subTitle="Bạn muốn thoát trang Admin?"
        variant="outlined"
      >
        <Tooltip
          placement="right"
          content={"Log out"}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className={`${!active ? "hidden" : ""}`}
        >
          <div className="flex gap-3 items-center">
            <CiLogout size={16} />
            {!active && (
              <span className="text-sm capitalize font-normal">Log out</span>
            )}
          </div>
        </Tooltip>
      </ButtonOutPage>
    </div>
  );
}
