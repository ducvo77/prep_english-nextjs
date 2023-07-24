"use client";

interface AnswersProps {
  label: string;
}

export default function Answer({ label }: AnswersProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold">{label}</h3>
      <ul className="grid grid-cols-5 gap-2 text-[0.75rem]">
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer text-white bg-blue-800">
          1
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          2
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          3
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          4
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          5
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          6
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          7
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          8
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          9
        </li>
        <li className="border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
          10
        </li>
      </ul>
    </div>
  );
}
