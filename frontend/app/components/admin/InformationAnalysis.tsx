"use client";

import { AiOutlineHistory } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineTask } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";

interface InformationAnalysisProps {
  totalUser: number;
  totalTests: number;
  totalTestHistory: number;
  totalBlog: number;
}

export default function InformationAnalysis({
  totalTests,
  totalTestHistory,
  totalBlog,
  totalUser,
}: InformationAnalysisProps) {
  const data = [
    {
      label: "User",
      total: totalUser,
      Icon: FiUserPlus,
    },
    {
      label: "Test",
      total: totalTests,
      Icon: MdOutlineTask,
    },
    {
      label: "Test Done",
      total: totalTestHistory,
      Icon: AiOutlineHistory,
    },
    {
      label: "Blog",
      total: totalBlog,
      Icon: HiOutlineQueueList,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 rounded-lg">
      {data.map(({ label, Icon, total }) => (
        <div
          key={label}
          className="bg-[#1F2A3F] p-6 flex flex-col gap-4 items-center justify-center"
        >
          <button className="w-10 h-10 rounded-full bg-[#868dfb] flex items-center justify-center">
            <Icon size={16} className="text-white" />
          </button>
          <span className="text-[#4cceac]">{label}</span>

          <div className="flex flex-col gap-2 justify-center items-center">
            <span className="font-semibold text-3xl">{total}</span>
            {/* <span className="text-[#868dfb]">+100%</span> */}
          </div>
        </div>
      ))}
    </div>
  );
}
