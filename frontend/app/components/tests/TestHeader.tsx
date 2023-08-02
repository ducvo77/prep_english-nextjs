"use client";

import ButtonOutPage from "./ButtonOutPage";
import { DataTypes } from "./index";
interface HeaderTestProps {
  data: DataTypes;
}
export default function HeaderTest({ data }: HeaderTestProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        <h2 className="text-lg font-semibold">{data.title}</h2>
        <ButtonOutPage
          title="Thoát trang web?"
          subtitle="Những thay đổi bạn đã thực hiện có thể không được lưu."
        />
      </div>
      <p>{data.test_kit.label}</p>
    </div>
  );
}
