import Section from "./components/Section";
import PromptChatgpt from "./components/PromptChatgpt";
import TestList from "./components/TestList";
import References from "./components/References";
import Dashboard from "./components/Dashboard";
import getTestKits from "./lib/getTestKits";
import getTestHistory from "./lib/getTestHistory";

export default async function Page() {
  const testKitsData: Promise<TestKit> = getTestKits();
  const testHistoryData: Promise<TestHistory> = getTestHistory("1");
  const [testKits, testHistory] = await Promise.all([
    testKitsData,
    testHistoryData,
  ]);

  return (
    <>
      <Section id="dashboard" label="Lịch sử luyện tập của bạn">
        <Dashboard data={testHistory} />
      </Section>
      <Section id="practice" label="Bài tập mới nhất">
        <TestList data={testKits.data} />
      </Section>
      <Section id="chatgpt" label="Luyện English cùng ChatGPT">
        <PromptChatgpt />
      </Section>
      <Section id="references" label="Tài liệu tham khảo">
        <References />
      </Section>
    </>
  );
}
