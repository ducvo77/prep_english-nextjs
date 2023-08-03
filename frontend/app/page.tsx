import Section from "./components/Section";
import PromptChatgpt from "./components/PromptChatgpt";
import TestList from "./components/TestList";
import References from "./components/References";
import Dashboard from "./components/Dashboard";
import { SessionProvider } from "next-auth/react";

async function getDataTestList() {
  const res = await fetch(
    `${process.env.API_URL}/test-kits?populate=tests&sort[0]=id`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getDataTestList();

  return (
    <>
      {/* <SessionProvider session={session}> */}
      <Section id="dashboard" label="Lịch sử luyện tập của bạn">
        <Dashboard />
      </Section>
      <Section id="practice" label="Bài tập mới nhất">
        <TestList data={data.data} />
      </Section>
      <Section id="chatgpt" label="Luyện English cùng ChatGPT">
        <PromptChatgpt />
      </Section>
      <Section id="references" label="Tài liệu tham khảo">
        <References />
      </Section>
      {/* </SessionProvider> */}
    </>
  );
}
