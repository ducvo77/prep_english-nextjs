"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return pathname?.startsWith("/test");
  }, [pathname]);

  return (
    <main
      className={`${
        isActive ? "px-3" : "xl:px-20 lg:px-10 md:px-5 px-2"
      } h-auto mt-20`}
    >
      {children}
    </main>
  );
}
