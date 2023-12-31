import TestHeader from "@/app/components/tests/TestHeader";
import TestContent from "@/app/components/tests/TestContent";
import getTest from "@/app/lib/getTest";
import { Metadata } from "next";

interface TestPageProps {
  params: {
    testId: string;
  };
}

interface TestDataType {
  data: Test;
}

export async function generateMetadata({
  params: { testId },
}: TestPageProps): Promise<Metadata> {
  const testData: Promise<TestDataType> = getTest(testId);
  const test = await testData;
  return {
    title: "Bài kiểm tra: " + test?.data?.title,
  };
}

export default async function TestPage({ params: { testId } }: TestPageProps) {
  const testData: Promise<TestDataType> = getTest(testId);
  const test = await testData;

  return (
    <div className="flex flex-col gap-2 sm:py-10 py-0">
      <TestHeader data={test.data} />
      <TestContent data={test.data} />
    </div>
  );
}
