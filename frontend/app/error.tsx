"use client"; // Error components must be Client Components

import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();
  return (
    <div className="min-h-[100vh] text-center mt-[40vh]">
      <h2 className="mb-2 text-xl">Có lỗi gì đó!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push("/")
        }
        // className="block"
      >
        Quan lại trang chủ
      </Button>
    </div>
  );
}
