"use client";

import {
  Input,
  Select,
  Option,
  Button,
  Spinner,
} from "@material-tailwind/react";
import TextareaCustom from "../input/TextareaCustom";
import NoteUsing from "../NoteUsing";

export default function TabWriting() {
  return (
    <>
      <NoteUsing />
      <form className="flex gap-10">
        <div className="flex-[6]">
          <Input label="Description of the topic of writing practice" />
        </div>
        <div className="flex-[1]">
          <Select label="Tasks" placeholder="bottom">
            <Option>Task 1</Option>
            <Option>Task 2</Option>
          </Select>
        </div>
        <div className="flex-[1]">
          <Select label="Levels" placeholder="bottom">
            <Option>Easy</Option>
            <Option>Intermediate</Option>
            <Option>Advanced</Option>
          </Select>
        </div>
        <Button className="flex-[1] overflow-visible second-bg">
          Generate
        </Button>
      </form>
      <Spinner className="flex mx-auto" />
      <TextareaCustom label="Outline of the essay" value="" />
      <TextareaCustom label="Write your article" value="" />
      <Button className="flex-[1] overflow-visible second-bg">Submit</Button>
      <Spinner className="flex mx-auto" />
      <TextareaCustom label="Fixing the mistakes in the essay" value="" />
    </>
  );
}
