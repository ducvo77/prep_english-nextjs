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

export default function TabReading() {
  const [describe, setDescribe] = useState("");
  const [passage, setPassage] = useState("Passage 1");
  const [level, setLevel] = useState("Easy");
  const [resultTopic, setResultTopic] = useState("");
  const [reading, setReading] = useState("");
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
  const [isLoadingFixing, setIsLoadingFixing] = useState(false);
  const [resultFixing, setResultFixing] = useState("");

  const onSubmitGanerate = useCallback(
    async (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
      setIsLoadingGenerate(true);

      try {
        const response = await fetch("/api/generate/reading/topic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ describe, passage, level }),
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
      } catch (error) {
        console.error(error);
      }
    },
    [describe, level, passage]
  );

  const submitInputWriting = useCallback(
    async (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
      setIsLoadingFixing(true);

      try {
        const response = await fetch("/api/generate/reading/fixing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: resultTopic, data: reading }),
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
      } catch (error) {
        console.error(error);
      }
    },
    [reading, resultTopic]
  );

  return (
    <>
      <NoteUsing reading />
      <form
        onSubmit={onSubmitGanerate}
        className="flex gap-10 lg:flex-row flex-col"
      >
        <div className="flex-[6]">
          <Input
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            required
            label="Description of the topic of Reading practice"
          />
        </div>
        <div className="flex-[1]">
          <Select
            label="Passages"
            placeholder="bottom"
            value={passage}
            onChange={(value) => {
              setPassage(value || "");
            }}
          >
            <Option value="Passage 1">Passage 1</Option>
            <Option value="Passage 2">Passage 2</Option>
            <Option value="Passage 3">Passage 3 </Option>
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
        <Button type="submit" className="flex-[1] overflow-visible bg-primary">
          Generate
        </Button>
      </form>
      {isLoadingGenerate && <Spinner className="flex mx-auto" />}
      {resultTopic && (
        <>
          <TextareaOutput label="Topic" value={resultTopic} />
          <Textarea
            label="Reply"
            shrink={true}
            size="lg"
            resize={true}
            value={reading}
            className="min-h-[300px]"
            onChange={(e) => setReading(e.target.value)}
          />
          <Button
            onClick={submitInputWriting}
            className="flex-[1] overflow-visible bg-primary"
          >
            Submit
          </Button>
        </>
      )}
      {isLoadingFixing && <Spinner className="flex mx-auto" />}
      {resultFixing && <TextareaOutput label="Result" value={resultFixing} />}
    </>
  );
}
