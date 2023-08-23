import DataList from "@/app/components/admin/TestList";
import getTestList from "@/app/lib/getTestList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Tests",
};

export default async function Page() {
  const testListData: Promise<TestList> = getTestList();
  const testList = await testListData;

  return (
    <div className="flex">
      <DataList data={testList.data} />
    </div>
  );
}
