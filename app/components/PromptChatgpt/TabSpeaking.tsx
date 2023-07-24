"use client";

import {
  Input,
  Select,
  Option,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { NextResponse } from "next/server";
import { useCallback, useEffect, useState } from "react";
import TextareaOutput from "../input/TextareaOutput";
import NoteUsing from "../NoteUsing";

export default function TabSpeaking() {
  const [describe, setDescribe] = useState("");
  const [part, setPart] = useState("Part 1 - Introduction and Interview");
  const [level, setLevel] = useState("Easy");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
      setIsLoading(true);

      try {
        const response = await fetch("/api/generate/speaking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ describe, part, level }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }

        setResult(data.result);
        setIsLoading(false);
        return NextResponse.json(data);
      } catch (error: any) {
        console.error(error);
      }
    },
    [describe, level, part]
  );

  return (
    <>
      <NoteUsing speaking />
      <form onSubmit={onSubmit} className="flex gap-10 lg:flex-row flex-col">
        <div className="flex-[6]">
          <Input
            label="Description of the topic of speaking practice"
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            required
          />
        </div>
        <div className="flex-[1]">
          <Select
            label="Parts"
            placeholder="bottom"
            value={part}
            onChange={(value) => {
              setPart(value || "");
            }}
          >
            <Option value="Part 1 - Introduction and Interview">Part 1</Option>
            <Option value="Part 2 - Cue Card">Part 2</Option>
            <Option value="Part 3 - Discussion">Part 3 </Option>
          </Select>
        </div>
        <div className="flex-[1]">
          <Select
            label="Levels"
            placeholder="bottom"
            value={level}
            onChange={(value) => {
              setLevel(value || "Easy");
            }}
          >
            <Option value="Easy">Easy</Option>
            <Option value="Intermediate">Intermediate</Option>
            <Option value="Advanced">Advanced</Option>
          </Select>
        </div>
        <Button type="submit" className="flex-[1] overflow-visible second-bg">
          Generate
        </Button>
      </form>

      {isLoading && <Spinner className="flex mx-auto" />}
      {result && <TextareaOutput label="Result" value={result} />}
    </>
  );
}
