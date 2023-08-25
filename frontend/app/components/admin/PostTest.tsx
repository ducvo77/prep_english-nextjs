"use client";

import addTest from "@/app/lib/admin/test/addTest";
import addTopic from "@/app/lib/admin/topic/addTopic";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { modules } from "./PostBlog";

interface PostTestProps {
  topicList: Topic[];
  testList: TestList[];
}

export default function PostTest({ topicList, testList }: PostTestProps) {
  const [topic, setTopic] = useState("");

  const [testTitle, setTestTitle] = useState("");
  const [testTime, setTestTime] = useState(0);
  const [testPartNumber, setTestPartNumber] = useState(0);
  const [testQuestionNumber, setTestQuestionNumber] = useState(0);
  const [topicId, setTopicId] = useState(0);

  const { data: session }: any = useSession();
  const jwt = useMemo(() => session?.user.jwt, [session]);
  const author = useMemo(() => session.user.name, [session]);

  const router = useRouter();

  const handlePostTopic = useCallback(async () => {
    if (!topic) {
      toast.error("Thất bại !!");
      return;
    }
    const res = await addTopic(topic, author, jwt);
    if (res) {
      setTopic("");
      router.refresh();
      toast.success("Thành công !!");
    }
  }, [jwt, topic, author, router]);

  const handlePostTest = useCallback(async () => {
    if (
      !testTitle ||
      !testTime ||
      !testPartNumber ||
      !testQuestionNumber ||
      !topicId
    ) {
      toast.error("Thất bại !!");
      return;
    }
    const res = await addTest(
      testTitle,
      testTime,
      testPartNumber,
      testQuestionNumber,
      author,
      topicId,
      jwt
    );
    console.log(res);

    if (res) {
      toast.success("Thành công !!");
      router.refresh();
      setTopic("");
      setTestTitle("");
      setTestTime(0);
      setTestPartNumber(0);
      setTestQuestionNumber(0);
    }
  }, [
    author,
    jwt,
    router,
    testPartNumber,
    testTime,
    testTitle,
    testQuestionNumber,
    topicId,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <Input
          type="text"
          label="Title of topic"
          className="text-white"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />
        <Button onClick={handlePostTopic}>Post</Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <Input
            type="text"
            label="Title"
            className="text-white"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
          />
          <Input
            type="number"
            label="Time"
            className="text-white"
            value={testTime}
            onChange={(e) => setTestTime(Number(e.target.value))}
          />
          <Input
            type="number"
            label="Part Number"
            className="text-white"
            value={testPartNumber}
            onChange={(e) => setTestPartNumber(Number(e.target.value))}
          />
          <Input
            type="number"
            label="Question Number"
            className="text-white"
            value={testQuestionNumber}
            onChange={(e) => setTestQuestionNumber(Number(e.target.value))}
          />
          <Select label="Topics" className="text-white">
            {topicList.map(({ id, title }) => (
              <Option key={id} value={title} onClick={() => setTopicId(id)}>
                {title}
              </Option>
            ))}
          </Select>
        </div>

        <Button onClick={handlePostTest}>Post</Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Select label="Title of topic" className="text-white">
            {testList.map(({ id, title }) => (
              <Option key={id} value={title}>
                {title}
              </Option>
            ))}
          </Select>
          <Input type="text" label="Name" className="text-white" />
          <input type="file" accept="audio/*" />
          <ReactQuill
            // value={content}
            // onChange={setContent}
            theme="snow"
            modules={modules}
          />
          <div className="flex flex-col gap-3">
            <Input type="number" label="Number" className="text-white" />
            <Input type="text" label="Question" className="text-white" />
            <Input type="text" label="Answer" className="text-white" />
            <Input type="text" label="Explain" className="text-white" />
          </div>
        </div>
        <Button>Post</Button>
      </div>
    </div>
  );
}
