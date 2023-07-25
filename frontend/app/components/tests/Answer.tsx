"use client";

interface AnswerProps {
  data: {
    id: number;
    title: string;
    label: string;
    data: {
      name: string;
      audio: string | boolean;
      topic: string;
      data: {
        number: number;
        question: string;
        answer: string;
      }[];
    }[];
  };
}

export default function Answer({ data }: AnswerProps) {
  return (
    <>
      {data.data.map(({ name, data }) => (
        <div key={name} className="flex flex-col gap-2">
          <h3 className="font-medium capitalize">{name}</h3>
          <ul className="grid grid-cols-5 gap-2 text-[0.75rem]">
            {data.map(({ number }) => (
              <li
                key={number}
                className={`${
                  false ? "bg-blue-800 text-white" : ""
                } border border-gray-800 w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer`}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
