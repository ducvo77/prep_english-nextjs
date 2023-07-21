"use client";
import { Textarea } from "@material-tailwind/react";
import { useState } from "react";

interface TextareaOutputProps {
  label: string;
  value: string;
  height?: string;
}

export default function TextareaOutput({
  label,
  value,
  height,
}: TextareaOutputProps) {
  const [data, setData] = useState(value);
  return (
    <Textarea
      label={label}
      shrink={true}
      size="lg"
      resize={true}
      value={data}
      // className="min-h-[300px]"
      className={`${height ? height : "min-h-[300px]"}`}
      onChange={(e) => setData(e.target.value)}
    />
  );
}
