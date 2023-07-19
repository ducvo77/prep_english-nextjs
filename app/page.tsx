"use client";

import Dashboard from "./components/Dashboard";
import Section from "./components/Section";
import PromptChatgpt from "./components/PromptChatgpt";
import { Button } from "@material-tailwind/react";
import TestList from "./components/TestList";

export default function Home() {
  return (
    <>
      <Dashboard />
      <Section label="Bài tập mới nhất">
        <TestList />
      </Section>
      <Section label="Tạo câu hỏi tự động để luyện tập">
        <PromptChatgpt />
      </Section>
    </>
  );
}
