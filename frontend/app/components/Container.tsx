"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { clearAnswer } from "../redux/features/answerSlice";
import { clearInfoTest } from "../redux/features/infoTestSlice";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const pathname = usePathname();
  // const dispatch = useDispatch();

  const isActive = useMemo(() => {
    return pathname?.startsWith("/tests");
  }, [pathname]);

  // useEffect(() => {
  //   if (!isActive) {
  //     dispatch(clearInfoTest());
  //     dispatch(clearAnswer());
  //   }
  // }, [dispatch, isActive]);

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
