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
        className="cursor-pointer"
      />
    </Link>
  );
}
