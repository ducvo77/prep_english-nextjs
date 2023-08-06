"use client";

import { redirect, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { clearInfoTest } from "../redux/features/infoTestSlice";
import { clearAnswer } from "../redux/features/answerSlice";
import { useSession } from "next-auth/react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: session }: { data: any } = useSession();
  useEffect(() => {
    if (!pathname?.startsWith("/tests")) {
      dispatch(clearInfoTest());
      dispatch(clearAnswer());
    }
  }, [dispatch, pathname]);

  const isActive = useMemo(() => {
    return pathname?.startsWith("/tests");
  }, [pathname]);
  useEffect(() => {
    if (session && (pathname === "/login" || pathname === "/register")) {
      redirect("/");
    }
  }, [pathname, session]);

  return (
    <main
      className={`${
        isActive ? "px-3" : "xl:px-20 lg:px-10 md:px-5 px-2"
      } h-auto mt-24`}
    >
      {children}
    </main>
  );
}
