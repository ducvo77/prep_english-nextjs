import ContainerContent from "@/app/components/admin/ContainerContent";
import DataList from "@/app/components/admin/DataList";
import getTopicList from "@/app/lib/getTopics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Topics",
};

interface TopicListDataType {
  data: Topic[];
}

export default async function Page() {
  const topicListData: Promise<TopicListDataType> = getTopicList();
  const topicList = await topicListData;

  return (
    <ContainerContent label="Topic list">
      <DataList topicList={topicList.data} />
    </ContainerContent>
  );
}
