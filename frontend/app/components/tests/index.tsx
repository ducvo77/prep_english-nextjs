"use client";

import { useEffect, useState } from "react";
import getListeningTest from "@/app/actions/getListeningTest";
import { useParams, usePathname } from "next/navigation";
import getTestList from "@/app/actions/getTestList";
import TestContent from "./TestContent";
import TestHeader from "./TestHeader";

export interface DataTypes {
  id: number;
  title: string;
  time: number;
  part_number: number;
  question_number: number;
  hastags: string[];
  href: string;
  test_kit: { id: number; label: string };
  listening_tests?: {
    id: number;
    name: string;
    topic: {
      content: string;
    };
    data: {
      number: string;
      answer: string;
      explain: string;
      question: string[];
    }[];
    audio?: {
      url: string;
    };
  }[];
  reading_tests?: {
    id: number;
    name: string;
    topic: {
      content: string;
    };
    data: {
      number: string;
      answer: string;
      explain: string;
      question: string[];
    }[];
    audio?: {
      url: string;
    };
  }[];
}

export type TestSectionKeys = "listening_tests" | "reading_tests";

let testSection: TestSectionKeys = "listening_tests";

export default function Test() {
  const [testId, setTestId] = useState(NaN);
  const [data, setData] = useState<DataTypes | null>(null);
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestList();
      const newArray = res.data.filter(
        (item: { href: string }) => item.href === pathname
      );
      setTestId(newArray[0].id);
    };
    fetchData();
  }, [pathname]);

  useEffect(() => {
    if (params?.title.includes("listening")) {
      testSection = "listening_tests";
    }
    if (params?.title.includes("reading")) {
      testSection = "reading_tests";
    }
  }, [params?.title]);

  useEffect(() => {
    if (testId) {
      const fetchData = async () => {
        const res = await getListeningTest(testId, testSection);
        setData(res.data);
      };
      fetchData();
    }
  }, [testId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 py-10">
      <TestHeader data={data} />
      <TestContent data={data} testSection={testSection} />
    </div>
  );
}
