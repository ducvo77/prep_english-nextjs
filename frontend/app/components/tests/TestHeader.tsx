"use client";

import { useRouter } from "next/navigation";
import ButtonOutPage from "../ButtonOutPage";

interface HeaderTestProps {
  data: Test;
}

export default function HeaderTest({ data }: HeaderTestProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        <h2 className="text-xl font-semibold">{data.title}</h2>
        <ButtonOutPage
          variant="outlined"
          className="p-2 text-xs capitalize"
          title="Bạn muốn thoát?"
          subTitle="Những thay đổi bạn đã thực hiện có thể không được lưu."
          onClick={() => router.push("/")}
        >
          <span>Thoát</span>
        </ButtonOutPage>
      </div>
      <p>{data.test_kit.label}</p>
    </div>
  );
}
