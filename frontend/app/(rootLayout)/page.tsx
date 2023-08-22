import Section from "../components/Section";
import PromptChatgpt from "../components/PromptChatgpt";
import TestList from "../components/tests/TestList";
import BlogList from "../components/blogs/BlogList";
import Dashboard from "../components/Dashboard";
import getTestList from "../lib/getTestList";
import getTestHistory from "../lib/getTestHistory";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getBlogList from "../lib/getBlogList";

interface BlogListDataType {
  data: [];
}

export default async function Page() {
  const session: any = await getServerSession(authOptions);

  const testListData: Promise<TestList> = getTestList();
  const testHistoryData: Promise<TestHistory> | null = session
    ? getTestHistory(session?.user?.id || Number(session?.user?.sub))
    : null;
  const blogListData: Promise<BlogListDataType> = getBlogList();

  const [testList, testHistory, blogList] = await Promise.all([
    testListData,
    testHistoryData,
    blogListData,
  ]);

  return (
    <>
      {testHistory && (
        <Section id="dashboard" label="Lịch sử luyện tập của bạn">
          <Dashboard data={testHistory} />
        </Section>
      )}
      <Section id="practice" label="Bài tập mới nhất">
        <TestList data={testList.data} />
      </Section>
      <Section id="chatgpt" label="Luyện English cùng ChatGPT">
        <PromptChatgpt />
      </Section>
      <Section id="blogs" label="Tài liệu tham khảo">
        <BlogList data={blogList.data} />
      </Section>
    </>
  );
}
