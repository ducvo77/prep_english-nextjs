"use client";

import Dashboard from "./dashboard/Dashboard";
import Section from "./components/Section";
import PromptChatgpt from "./components/PromptChatgpt";
import TestList from "./components/TestList";
import References from "./components/References";

export default function Home() {
  return (
    <>
      <Dashboard />
      <Section id="practice" label="Bài tập mới nhất">
        <TestList />
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
