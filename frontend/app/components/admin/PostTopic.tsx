"use client";

import { Button, Input } from "@material-tailwind/react";

export default function PostTopic() {
  return (
    <div className="flex flex-col gap-6">
      <Input type="text" label="Title of topic" className="text-white" />
      <Button>Post</Button>
    </div>
  );
}
