"use client";

import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Spinner className="h-8 w-8" />;
    </div>
  );
}
