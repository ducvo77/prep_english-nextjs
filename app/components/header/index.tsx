"use client";

import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between shadow-lg fixed left-0 right-0 top-0 bg-white z-[99] xl:px-20 lg:px-10 md:px-5 px-2">
      <Logo />
      <Nav />
    </header>
  );
}
