"use client";

import Dashboard from "./components/Dashboard";
import Section from "./components/Section";
import PromptChatgpt from "./components/PromptChatgpt";
import TestList from "./components/TestList";
import References from "./components/References";

export default function Home() {
  return (
    <>
      <Dashboard />
      <Section label="Bài tập mới nhất">
        <TestList />
      </Section>
      <Section label="Luyện English cùng ChatGPT">
        <PromptChatgpt />
      </Section>
      <Section label="Tài liệu tham khảo">
        <References />
      </Section>
    </>
  );
}
