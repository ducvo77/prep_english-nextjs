"use client";

import addTest from "@/app/lib/admin/test/addTest";
import editTest from "@/app/lib/admin/test/editTest";
import addTopic from "@/app/lib/admin/topic/addTopic";
import editTopic from "@/app/lib/admin/topic/editTopic";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
// import ReactQuill from "react-quill";
// import { modules } from "./PostBlog";
// import addPart from "@/app/lib/admin/part/addPart";

interface PostTestProps {
  topicData?: Topic;
  topicList?: Topic[];
  testData?: TestList;
  testList?: TestList[];
  topicEditId?: string;
  testEditId?: string;
}

export default function PostTest({
  topicData,
  topicList,
  testData,
  testList,
  topicEditId,
  testEditId,
}: PostTestProps) {
  // state topic
  const [topic, setTopic] = useState("");
  //state test info
  const [testTitle, setTestTitle] = useState("");
  const [testTime, setTestTime] = useState(0);
  const [testPartNumber, setTestPartNumber] = useState(0);
  const [testQuestionNumber, setTestQuestionNumber] = useState(0);
  const [topicId, setTopicId] = useState(0);
  //state test part
  // const [partName, setPartName] = useState("");
  // const [audioFile, setAudioFile] = useState({});
  // const [audioUrl, setAudioUrl] = useState("");
  // const [audioId, setAudioId] = useState(0);
  // const [partTopic, setPartTopic] = useState("");
  // const [partNumber, setPartNumber] = useState(0);
  // const [partQuestion, setPartQuestion] = useState("");
  // const [partAnswer, setPartAnswer] = useState("");
  // const [partExplain, setPartExplain] = useState("");
  // const [testId, setTestId] = useState(0);
  //chung
  const { data: session }: any = useSession();
  const jwt = useMemo(() => session?.user?.jwt, [session]);
  const author = useMemo(() => session?.user?.name, [session]);

  const router = useRouter();

  const handlePostTopic = async () => {
    if (!topic) {
      toast.error("Vui lòng nhập đủ thông tin !!");
      return;
    }
    const res = await addTopic(topic, author, jwt);
    if (res) {
      setTopic("");
      router.refresh();
      toast.success("Thành công !!");
    }
  };

  const handleEditTopic = async () => {
    if (!topic || topic === topicData?.title) {
      toast.error("Chưa có sự thay đổi");
      return;
    }
    const res = await editTopic(topicEditId, topic, jwt);

    if (res) {
      toast.success("Thành công");
      router.refresh();
    }
  };

  const handlePostTest = async () => {
    if (
      !testTitle ||
      !testTime ||
      !testPartNumber ||
      !testQuestionNumber ||
      !topicId
    ) {
      toast.error("Vui lòng nhập đủ thông tin !!");
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

    if (res) {
      toast.success("Thành công !!");
      setTestTitle("");
      setTopicId(0);
      setTestTime(0);
      setTestPartNumber(0);
      setTestQuestionNumber(0);
      router.refresh();
    }
  };

  const handleEditTest = async () => {
    if (
      !testTitle ||
      !testTime ||
      !testPartNumber ||
      !testQuestionNumber ||
      !topicId ||
      (testTitle === testData?.title &&
        testTime === testData?.time &&
        testPartNumber === testData.part_number &&
        testQuestionNumber === testData.question_number &&
        topicId === testData.topic?.id)
    ) {
      toast.error("Chưa có sự thay đổi");
      return;
    }
    if (testData) {
      const res = await editTest(
        testEditId,
        testTitle || testData.title,
        testTime || testData.time,
        testPartNumber || testData.part_number,
        testQuestionNumber || testData.question_number,
        topicId || testData?.topic?.id || 0,
        jwt
      );

      if (res) {
        toast.success("Thành công");

        router.refresh();
      }
    }
  };

  useEffect(() => {
    if (topicData) {
      setTopic(topicData?.title);
    }
  }, [topicData]);

  useEffect(() => {
    if (testData) {
      setTestTitle(testData.title);
      setTestTime(testData.time);
      setTestPartNumber(testData.part_number);
      setTestQuestionNumber(testData.question_number);
      setTopicId(testData.topic ? testData.topic?.id : 0);
    }
  }, [testData]);

  return (
    <div className="flex flex-col gap-6">
      {(topicData || (!testData && !topicData)) && (
        <div className="flex flex-col gap-6">
          {!topicData && <h3 className="font-medium text-lg">1. Add Topic </h3>}
          <div className="flex gap-6">
            <Input
              type="text"
              label="Title of topic"
              className="text-white"
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
            />
            <Button onClick={topicData ? handleEditTopic : handlePostTopic}>
              {topicData ? "Edit" : "Post"}
            </Button>
          </div>
        </div>
      )}
      {(testData || (!testData && !topicData)) && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {!testData && (
              <h3 className="font-medium text-lg">2. Add Test Info </h3>
            )}
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
              <Select
                label="Topics"
                className="text-white"
                value={
                  topicList?.filter(
                    (item) => item.id === testData?.topic?.id
                  )[0]?.title
                }
                onChange={(value) => {
                  setTopicId(
                    topicList?.filter((item) => item.title === value)[0]?.id ||
                      0
                  );
                }}
              >
                {topicList?.map(({ id, title }) => (
                  <Option key={id} value={title}>
                    {title}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <Button onClick={testData ? handleEditTest : handlePostTest}>
            {testData ? "Edit" : "Post"}
          </Button>
        </div>
      )}
      {/* <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-lg">3. Add Test Part </h3>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <Select label="Title of topic" className="text-white">
                {testList.map(({ id, title }) => (
                  <Option key={id} value={title} onClick={() => setTestId(id)}>
                    {title}
                  </Option>
                ))}
              </Select>
              <Input
                type="text"
                label="Name"
                className="text-white"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
              />
            </div>
            <input type="file" accept="audio/*" onChange={handleChangeAudio} />
            {audioUrl && <audio src={audioUrl} controls />}
            <div>
              <h3 className="text-center my-2 text-lg uppercase">Topic</h3>
              <ReactQuill
                value={partTopic}
                onChange={setPartTopic}
                theme="snow"
                modules={modules}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Input type="number" label="Number" className="text-white" />
              <div>
                <h3 className="text-center my-2 text-lg uppercase">Question</h3>
                <ReactQuill
                  value={partQuestion}
                  onChange={setPartQuestion}
                  theme="snow"
                  modules={modules}
                />
              </div>
              <Input
                type="text"
                label="Answer"
                className="text-white"
                value={partAnswer}
                onChange={(e) => setPartAnswer(e.target.value)}
              />
              <Input
                type="text"
                label="Explain"
                className="text-white"
                value={partExplain}
                onChange={(e) => setPartExplain(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button onClick={handlePostPartTest}>Post</Button>
      </div> */}
    </div>
  );
}
