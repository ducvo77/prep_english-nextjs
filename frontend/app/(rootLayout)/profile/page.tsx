//https://dribbble.com/shots/17219796-My-details-settings-page-Untitled-UI

import Content from "@/app/components/profile/Content";
import getCurrentUser from "@/app/lib/getCurrentUser";
import { getSession } from "@/app/lib/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function page() {
  const session: User = await getSession();
  const currentUser: CurrentUser = await getCurrentUser(session?.user?.jwt);

  if (!session) redirect("/");
  return (
    <div className="sm:py-10 py-0">
      <Content userData={currentUser} />
    </div>
  );
}
