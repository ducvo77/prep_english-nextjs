"use client";

import {
  Input,
  Select,
  Option,
  Button,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import TextareaOutput from "../input/TextareaOutput";
import NoteUsing from "../NoteUsing";
import { NextResponse } from "next/server";
import { useCallback, useState } from "react";

export default function TabWriting() {
  const [describe, setDescribe] = useState("");
  const [task, setTask] = useState("IELTS Writing Task 2");
  const [level, setLevel] = useState("Easy");
  const [resultTopic, setResultTopic] = useState("");
  const [writing, setWriting] = useState("");
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
  const [isLoadingFixing, setIsLoadingFixing] = useState(false);
  const [resultFixing, setResultFixing] = useState("");

  const onSubmitGanerate = useCallback(
    async (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
      setIsLoadingGenerate(true);

      try {
        const response = await fetch("/api/generate/writing/topic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ describe, task, level }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        setResultTopic(data.result);
        setIsLoadingGenerate(false);
        return NextResponse.json(data);
      } catch (error: any) {
        console.error(error);
      }
    },
    [describe, level, task]
  );

  const submitInputWriting = useCallback(
    async (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
      setIsLoadingFixing(true);

      try {
        const response = await fetch("/api/generate/writing/fixing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: resultTopic, data: writing }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        setResultFixing(data.result);
        setIsLoadingFixing(false);
        return NextResponse.json(data);
      } catch (error: any) {
        console.error(error);
      }
    },
    [writing, resultTopic]
  );

  return (
    <>
      <NoteUsing writing />
      <form onSubmit={onSubmitGanerate} className="flex gap-10">
        <div className="flex-[6]">
          <Input
            label="Description of the topic of writing practice"
            onChange={(e) => setDescribe(e.target.value)}
            required
            value={describe}
          />
        </div>
        <div className="flex-[1]">
          <Select
            label="Tasks"
            placeholder="bottom"
            value={task}
            onChange={(value) => {
              setTask(value || "");
            }}
          >
            <Option value="IELTS General Training Task 1">
              Task 1 (Chưa hỗ trợ)
            </Option>
            <Option value="IELTS Writing Task 2">Task 2</Option>
          </Select>
        </div>
        <div className="flex-[1]">
          <Select
            label="Levels"
            placeholder="bottom"
            value={level || "Easy"}
            onChange={(value) => {
              setLevel(value || "");
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
      {isLoadingGenerate && <Spinner className="flex mx-auto" />}
      {resultTopic && (
        <>
          <TextareaOutput label="Outline of the essay" value={resultTopic} />
          <Textarea
            label="Write your article"
            shrink={true}
            size="lg"
            resize={true}
            value={writing}
            className="min-h-[300px]"
            onChange={(e) => setWriting(e.target.value)}
          />
          <Button
            onClick={submitInputWriting}
            className="flex-[1] overflow-visible second-bg"
          >
            Submit
          </Button>
        </>
      )}
      {isLoadingFixing && <Spinner className="flex mx-auto" />}
      {resultFixing && (
        <TextareaOutput
          label="Fixing the mistakes in the essay"
          value={resultFixing}
        />
      )}
    </>
  );
}
