"use client";

import { Button } from "@material-tailwind/react";
// import ButtonOutPage from "./ButtonOutPage";
import { useRouter } from "next/navigation";

export default function HeaderTest({ data }: Test) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        <h2 className="text-lg font-semibold">{data.title}</h2>
        {/* <ButtonOutPage
          title="Thoát trang web?"
          subtitle="Những thay đổi bạn đã thực hiện có thể không được lưu."
        /> */}
        <Button
          onClick={() => router.push("/")}
          variant="outlined"
          className="p-2 text-xs capitalize"
        >
          Thoát
        </Button>
      </div>
      <p>{data.test_kit.label}</p>
    </div>
  );
}
