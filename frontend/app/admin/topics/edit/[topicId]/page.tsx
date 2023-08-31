import ContainerContent from "@/app/components/admin/ContainerContent";
import PostTest from "@/app/components/admin/PostTest";
import getTopic from "@/app/lib/admin/topic/getTopic";

interface TopicPageProps {
  params: {
    topicId: string;
  };
}

interface TopicDataType {
  data: Topic;
}

export default async function page({ params: { topicId } }: TopicPageProps) {
  const topicData: TopicDataType = await getTopic(topicId);
  return (
    <ContainerContent label="EDIT TOPIC">
      <PostTest topicData={topicData.data} topicEditId={topicId} />
    </ContainerContent>
  );
}
