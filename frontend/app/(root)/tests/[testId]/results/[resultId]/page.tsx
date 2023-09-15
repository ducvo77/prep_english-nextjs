import TestHeader from "@/app/components/tests/TestHeader";
import TestContent from "@/app/components/tests/TestContent";
import { Metadata } from "next";
import getTest from "@/app/lib/getTest";
import getUserAssignment from "@/app/lib/getUserAssignment";

interface ResultPageProps {
  params: {
    testId: string;
    resultId: string;
  };
}

interface TestDataType {
  data: Test;
}

export async function generateMetadata({
  params: { testId },
}: ResultPageProps): Promise<Metadata> {
  const testData: Promise<TestDataType> = getTest(testId);
  const test = await testData;
  return {
    title: "Đáp án chi tiết: " + test.data?.title,
  };
}

export default async function Result({
  params: { testId, resultId },
}: ResultPageProps) {
  const testData: Promise<TestDataType> = getTest(testId);
  const userAssignmentData: Promise<UserAssignment> =
    getUserAssignment(resultId);
  const [test, userAssignment] = await Promise.all([
    testData,
    userAssignmentData,
  ]);

  return (
    <div className="flex flex-col gap-2 py-10">
      <TestHeader data={test.data} />
      <TestContent data={test.data} userAssignment={userAssignment} />
    </div>
  );
}
