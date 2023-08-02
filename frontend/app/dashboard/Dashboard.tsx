"use client";

import { DataSheet } from "./DataSheet";

export default function Dashboard() {
  return (
    <section className="w-ful h-[37.5rem] bg-slate-50 mb-16 flex flex-col gap-8 pt-10">
      <h1 className="uppercase text-center font-semibold text-2xl">
        Lịch sử thi của bạn
      </h1>
      <DataSheet />
    </section>
  );
}
