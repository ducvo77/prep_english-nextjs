"use client";

import Link from "next/link";
import User from "./User";

const MENU_LIST = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Luyện tập",
    href: "/tests",
  },
  {
    label: "Tài liệu tham khảo",
    href: "/",
  },
];

export default function Nav() {
  return (
    <div className="flex gap-20">
      <ul className="flex gap-10 items-center">
        {MENU_LIST.map((item, index) => (
          <li
            key={`item ${index}`}
            className="hover:text-[#1A56DB] font-semibold"
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <>
        <User />
      </>
    </div>
  );
}
