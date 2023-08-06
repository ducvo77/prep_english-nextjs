import Section from "./components/Section";
import PromptChatgpt from "./components/PromptChatgpt";
import TestList from "./components/TestList";
import References from "./components/References";
import Dashboard from "./components/Dashboard";
import getTestKits from "./lib/getTestKits";

export default async function Page() {
  const data = await getTestKits();

  return (
    <>
      <Section id="dashboard" label="Lịch sử luyện tập của bạn">
        <Dashboard />
      </Section>
      <Section id="practice" label="Bài tập mới nhất">
        <TestList data={data} />
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
