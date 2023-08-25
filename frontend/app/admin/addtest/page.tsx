import ContainerContent from "@/app/components/admin/ContainerContent";
import PostTest from "@/app/components/admin/PostTest";
import getTestList from "@/app/lib/getTestList";
import getTopicList from "@/app/lib/getTopics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Add Test",
};

interface TopicListDataType {
  data: Topic[];
}

interface TestListDataType {
  data: TestList[];
}

export default async function Page() {
  const topicListData: Promise<TopicListDataType> = getTopicList();
  const testListData: Promise<TestListDataType> = getTestList();
  const [topicList, testList] = await Promise.all([
    topicListData,
    testListData,
  ]);

  return (
    <ContainerContent label="Add test">
      <PostTest topicList={topicList.data} testList={testList.data} />
    </ContainerContent>
  );
}
