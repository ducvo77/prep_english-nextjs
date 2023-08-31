import Section from "../components/Section";
import PromptChatgpt from "../components/PromptChatgpt";
import TestList from "../components/tests/TestList";
import BlogList from "../components/blogs/BlogList";
import Dashboard from "../components/Dashboard";
import getTopics from "../lib/getTopics";
import getBlogList from "../lib/getBlogList";
import { getSession } from "../lib/getSession";
import getCurrentUser from "../lib/getCurrentUser";

interface BlogListDataType {
  data: Blog[];
}

interface TopicListDataType {
  data: Topic[];
}

export default async function Page() {
  const session: User = await getSession();

  const testListData: Promise<TopicListDataType> = getTopics();
  const currentUserData: Promise<CurrentUser> = getCurrentUser(
    session?.user?.jwt
  );
  const blogListData: Promise<BlogListDataType> = getBlogList();

  const [testList, userData, blogList] = await Promise.all([
    testListData,
    currentUserData,
    blogListData,
  ]);

  return (
    <>
      {userData && (
        <Section id="dashboard" label="Lịch sử luyện tập của bạn">
          <Dashboard userData={userData} />
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
