"use client";

import { useAppSelector } from "../redux/hook";

export default function References() {
  const user = useAppSelector((state) => state.userReducer);
  return (
    <div className="h-[300px] border flex items-center justify-center">
      Block References
    </div>
  );
}
