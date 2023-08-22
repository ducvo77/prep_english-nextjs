import { Metadata } from "next";
import Chart from "../components/admin/Chart";

// https://github.com/jyotiv2023/admindash?ref=reactjsexample.com
export const metadata: Metadata = {
  title: "Admin - Dashboard",
};

export default async function Page() {
  return (
    <div>
      <Chart />
    </div>
  );
}
