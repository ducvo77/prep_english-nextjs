import ContainerContent from "@/app/components/admin/ContainerContent";
import DataList from "@/app/components/admin/DataList";
import getTestList from "@/app/lib/getTestList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Tests",
};

export default async function Page() {
  const testListData: Promise<TestKit> = getTestList();
  const testList = await testListData;

  return (
    <ContainerContent label="test list">
      <DataList testList={testList.data.map((item) => item.tests).flat()} />
    </ContainerContent>
  );
}
