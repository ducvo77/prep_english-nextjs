"use client";

import User from "./User";

const MENU_LIST = [
  {
    label: "Trang chủ",
    href: "#",
  },
  {
    label: "Bài tập",
    href: "#practice",
  },
  {
    label: "ChatGPT",
    href: "#chatgpt",
  },
  {
    label: "Tài liệu tham khảo",
    href: "#references",
  },
];

export default function Nav() {
  return (
    <div className="flex gap-20">
      <ul className="flex gap-10 items-center">
        {MENU_LIST.map((item, index) => (
          <li
            key={`item ${index}`}
            className="hover:text-[#1A56DB] font-semibold white"
          >
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
      <>
        <User />
      </>
    </div>
  );
}
