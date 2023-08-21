"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { BsPostcardHeart } from "react-icons/bs";
import { GoWorkflow } from "react-icons/go";

const menu_list = [
  {
    label: "Dashboard",
    Icon: AiOutlineHome,
    slug: "",
  },
  {
    label: "Khóa học",
    Icon: GoWorkflow,
    slug: "courses",
  },
  {
    label: "Bài viết",
    Icon: BsPostcardHeart,
    slug: "blogs",
  },
];

export default function SideBar() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="border w-[300px] p-10 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Link href={"/admin"}>
          <h1 className="text-2xl">ADMIN</h1>
        </Link>
        <button className="flex justify-center items-center w-10 h-10 hover:bg-[#303B4E] cursor-pointer rounded-full transition-all">
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
        {menu_list.map(({ label, Icon, slug }) => (
          <Link
            href={"/admin/" + slug}
            key={label}
            className={`flex gap-3 items-center py-2 text-sm ${
              slug === (segment || "") ? "text-[#6770FA]" : ""
            }`}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
