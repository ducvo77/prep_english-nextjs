import ContainerContent from "@/app/components/admin/ContainerContent";
import DataList from "@/app/components/admin/DataList";
import getTestList from "@/app/lib/getTestList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Tests",
};

interface TestListDataType {
  data: Test[];
}

export default async function Page() {
  const testListData: Promise<TestListDataType> = getTestList();
  const testList = await testListData;

  return (
    <ContainerContent label="test list">
      <DataList testList={testList.data} />
    </ContainerContent>
  );
}
