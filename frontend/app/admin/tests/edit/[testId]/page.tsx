import ContainerContent from "@/app/components/admin/ContainerContent";
import PostTest from "@/app/components/admin/PostTest";
import getTest from "@/app/lib/getTest";
import getTopicList from "@/app/lib/getTopics";
import React from "react";
interface TestPageProps {
  params: {
    testId: string;
  };
}

interface TestDataType {
  data: TestList;
}

interface TopicListDataType {
  data: Topic[];
}

export default async function page({ params: { testId } }: TestPageProps) {
  const testData: TestDataType = await getTest(testId);
  const topicList: TopicListDataType = await getTopicList();

  return (
    <ContainerContent label="EDIT Test">
      <PostTest
        testData={testData.data}
        topicList={topicList.data}
        testEditId={testId}
      />
    </ContainerContent>
  );
}

// import ContainerContent from "@/app/components/admin/ContainerContent";
// import PostTest from "@/app/components/admin/PostTest";
// import getTopic from "@/app/lib/admin/topic/getTopic";

// interface TopicPageProps {
//   params: {
//     topicId: string;
//   };
// }

// interface TopicDataType {
//   data: Topic;
// }

// export default async function page({ params: { topicId } }: TopicPageProps) {
//   const topicData: TopicDataType = await getTopic(topicId);
//   return (
//     <ContainerContent label="EDIT TOPIC">
//       <PostTest topicData={topicData.data} />
//     </ContainerContent>
//   );
// }
