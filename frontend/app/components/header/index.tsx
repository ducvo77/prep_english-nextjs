"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";
import Nav from "./Nav";
import { useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);
  return (
    <header className="py-2 flex lg:flex-row flex-col  min-h-20 items-center justify-between shadow-lg fixed left-0 right-0 top-0 bg-white z-[99] xl:px-20 lg:px-10 md:px-5 px-2">
      <div className="flex items-center justify-between lg:w-auto w-full">
        <Logo />
        <AiOutlineMenu
          size={20}
          className="lg:hidden block cursor-pointer"
          onClick={() => setShow(!show)}
        />
      </div>
      {<Nav show={show} />}
    </header>
  );
}
