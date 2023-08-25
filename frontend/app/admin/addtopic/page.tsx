import ContainerContent from "@/app/components/admin/ContainerContent";
import PostTopic from "@/app/components/admin/PostTopic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Add Topic",
};

export default function Page() {
  return (
    <ContainerContent label="Add topic">
      <PostTopic />
    </ContainerContent>
  );
}
