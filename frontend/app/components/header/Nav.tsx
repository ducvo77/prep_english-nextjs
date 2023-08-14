"use client";

import { Button } from "@material-tailwind/react";
import User from "./User";
import { signOut, useSession } from "next-auth/react";

const MENU_LIST = [
  {
    label: "Trang chủ",
    href: "/#",
  },
  {
    label: "Bài tập",
    href: "/#practice",
  },
  {
    label: "ChatGPT",
    href: "/#chatgpt",
  },
  {
    label: "Tài liệu tham khảo",
    href: "/#references",
  },
  {
    label: <Button>Đăng nhập</Button>,
    href: "/login",
  },
  {
    label: <Button onClick={() => signOut()}>Đăng xuất</Button>,
  },
];

export default function Nav({ show }: { show: boolean }) {
  const { data: session } = useSession();
  return (
    <div className={`${show ? "flex" : "lg:flex hidden"} gap-20`}>
      <ul className="flex md:flex-row flex-col md:gap-10 gap-4 items-center">
        {MENU_LIST.map(
          (item, index) =>
            (session ? index !== 4 : index !== 5) && (
              <li
                key={`item ${index}`}
                className={`hover:text-[#1A56DB] font-semibold white flex ${
                  index === MENU_LIST.length - 1 ||
                  index === MENU_LIST.length - 2
                    ? "lg:hidden block"
                    : ""
                }`}
              >
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <>{item.label}</>
                )}
              </li>
            )
        )}
      </ul>
      <div className="lg:block hidden">
        <User />
      </div>
    </div>
  );
}
