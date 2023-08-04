"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { clearInfoTest } from "../redux/features/infoTestSlice";
import { clearAnswer } from "../redux/features/answerSlice";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!pathname?.startsWith("/tests")) {
      dispatch(clearInfoTest());
      dispatch(clearAnswer());
    }
  }, [dispatch, pathname]);

  const isActive = useMemo(() => {
    return pathname?.startsWith("/tests");
  }, [pathname]);

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
