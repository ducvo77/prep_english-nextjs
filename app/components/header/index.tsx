"use client";

import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between shadow-lg px-20 fixed left-0 right-0 top-0 bg-white">
      <Logo />
      <Nav />
    </header>
  );
}
