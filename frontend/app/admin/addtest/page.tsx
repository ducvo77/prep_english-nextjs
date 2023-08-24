import ContainerContent from "@/app/components/admin/ContainerContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Add Test",
};

export default function Page() {
  return (
    <ContainerContent label="Add test">
      <div></div>
    </ContainerContent>
  );
}
