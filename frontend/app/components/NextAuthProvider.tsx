"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider basePath="/api/auth">{children}</SessionProvider>;
};
