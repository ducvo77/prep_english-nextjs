"use client";
import { Textarea } from "@material-tailwind/react";
import { useState } from "react";

interface TextareaCustomProps {
  label: string;
  value: string;
}

export default function TextareaCustom({ label, value }: TextareaCustomProps) {
  const [data, setData] = useState(value);
  return (
    <Textarea
      label={label}
      shrink={true}
      size="lg"
      resize={true}
      value={data}
      className="min-h-[300px]"
      onChange={(e) => setData(e.target.value)}
    />
  );
}
