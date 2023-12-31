"use client";

import { Button } from "@material-tailwind/react";
import User from "./User";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavProps {
  show: boolean;
  userData: CurrentUser;
}

export default function Nav({ show, userData }: NavProps) {
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
      label: "Bài viết",
      href: "/#blogs",
    },
    {
      label: <Button>Đăng nhập</Button>,
      href: "/login",
    },
    {
      label: <Button onClick={() => signOut()}>Đăng xuất</Button>,
    },
    // {
    //   label: <button onClick={() => router.push("/profile")}>Profile</button>,
    // },
  ];

  const { data: session } = useSession();
  const pathname = usePathname();
  const Tag = pathname === "/" ? "a" : Link;
  return (
    <div className={`${show ? "flex" : "lg:flex hidden"} gap-20`}>
      <ul className="flex md:flex-row flex-col md:gap-10 gap-4 items-center">
        {MENU_LIST.map(
          (item, index) =>
            (session ? index !== 4 : index !== 5) && (
              <li
                key={`item ${index}`}
                className={`hover:text-primary font-semibold white flex ${
                  index === MENU_LIST.length - 1 ||
                  index === MENU_LIST.length - 2
                    ? "lg:hidden block"
                    : ""
                }`}
              >
                {item.href ? (
                  <Tag href={item.href}>{item.label}</Tag>
                ) : (
                  <>{item.label}</>
                )}
              </li>
            )
        )}
      </ul>
      <div className="lg:block hidden">
        <User userData={userData} />
      </div>
    </div>
  );
}
