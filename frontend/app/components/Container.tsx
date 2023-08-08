"use client";

import { redirect, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { clearInfoTest } from "../redux/features/infoTestSlice";
import { clearAnswer } from "../redux/features/answerSlice";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../redux/hook";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
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

  const user: User = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (user.username && (pathname === "/login" || pathname === "/register")) {
      redirect("/");
    }
  }, [user, pathname, session]);

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
