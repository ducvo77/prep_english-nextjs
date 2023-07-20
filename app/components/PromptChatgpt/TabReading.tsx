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

export default function TabReading() {
  return (
    <>
      <NoteUsing />
      <form className="flex gap-10">
        <div className="flex-[6]">
          <Input label="Description of the topic of Reading practice" />
        </div>
        <div className="flex-[1]">
          <Select label="Passages" placeholder="bottom">
            <Option>Passage 1</Option>
            <Option>Passage 2</Option>
            <Option>Passage 3 </Option>
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
      <TextareaCustom label="Topic" value="" />
      <TextareaCustom label="Reply" value="" />
      <Button className="flex-[1] overflow-visible second-bg">Submit</Button>
      <Spinner className="flex mx-auto" />
      <TextareaCustom label="Result" value="" />
    </>
  );
}
