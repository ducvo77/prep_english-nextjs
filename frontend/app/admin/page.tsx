// https://github.com/jyotiv2023/admindash?ref=reactjsexample.com
import { Metadata } from "next";
import Chart from "../components/admin/Chart";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
};

export default async function Admin() {
  return (
    <div>
      <Chart />
    </div>
  );
}
