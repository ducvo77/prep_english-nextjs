"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineFileAdd, AiOutlineMenu } from "react-icons/ai";
import { BsPostcardHeart } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { GoWorkflow } from "react-icons/go";
import { MdPostAdd } from "react-icons/md";

const menu_list = [
  {
    label: "Dashboard",
    Icon: RxDashboard,
    href: "/admin",
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
  {
    label: "Log Out",
    Icon: CiLogout,
    href: "/",
  },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="w-[260px] p-10 flex flex-shrink-0 flex-col gap-6 relative overflow-y-scroll bg-[#1F2A40]">
      <div className="flex justify-between items-center">
        <Link href={"/admin"}>
          <h1 className="text-2xl uppercase">prep english</h1>
        </Link>
        <button className="flex justify-center items-center w-10 min-w-[40px] h-10 hover:bg-[#303B4E] cursor-pointer rounded-full transition-all">
          <AiOutlineMenu />
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/user-default.jpg"
          width={100}
          height={100}
          alt="Avatar"
          className="rounded-full"
        />
        <div className="flex flex-col gap-1 items-center">
          <span className="font-semibold text-xl">Võ Công Đức</span>
          <span className="text-sm text-[#4cceac]">Admin</span>
        </div>
      </div>

      <ul>
        {menu_list.map(({ label, Icon, href }) => (
          <Link
            href={href}
            key={label}
            className={`flex gap-3 items-center py-3 text-sm hover:text-[#6770FA] ${
              href === pathname ? "text-[#6770FA]" : ""
            }`}
          >
            <Icon size={15} />
            <span>{label}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
