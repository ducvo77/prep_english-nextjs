"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={"/images/logo.png"}
        alt="Logo"
        width={192}
        height={69}
        sizes="(max-width: 500px) 100px"
        className="cursor-pointer lg:w-[192px] md:w-[164px] sm:w-[148px] w-[132px]"
        priority
      />
    </Link>
  );
}
