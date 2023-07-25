"use client";

interface QuestionsProps {
  data: {
    name: string;
    audio: string | boolean;
    topic: string;
    data: {
      number: number;
      question: string;
      answer: string;
    }[];
  };
}

export default function Questions({ data }: QuestionsProps) {
  return (
    <ul className="flex flex-col gap-10 overflow-y-scroll pb-10 w-1/3">
      {data.data.map(({ number }) => (
        <li key={number} className="flex gap-2">
          <strong className="w-8 h-8 rounded-full bg-[#E8F2FF] text-[#35509A] flex items-center justify-center">
            {number}
          </strong>
          <input
            type="text"
            className="border rounded-md border-gray-500 focus:border-gray-700 focus:border-2 focus:outline-none pl-2"
          />
        </li>
      ))}
    </ul>
  );
}
