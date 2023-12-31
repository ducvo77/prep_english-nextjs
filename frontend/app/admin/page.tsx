// https://github.com/jyotiv2023/admindash?ref=reactjsexample.com

import Chart from "../components/admin/Chart";
import InformationAnalysis from "../components/admin/InformationAnalysis";
import getUser from "../lib/getUser";
import getTestList from "../lib/getTestList";
import getTestHistoryList from "../lib/getTestHistoryList";
import getBlogList from "../lib/getBlogList";
import { getSession } from "../lib/getSession";

export default async function Admin() {
  const session: User = await getSession();
  const jwt = session?.user?.jwt;

  const [userData, testListData, testHistoryListData, BlogListData] =
    await Promise.all([
      getUser(jwt),
      getTestList(),
      getTestHistoryList(jwt),
      getBlogList(),
    ]);

  return (
    <div className="flex flex-col gap-10">
      <InformationAnalysis
        totalUser={userData.length}
        totalTests={testListData.data.length}
        totalTestHistory={testHistoryListData.data.length}
        totalBlog={BlogListData.data.length}
      />
      <Chart
        totalUser={userData.length}
        totalTests={testListData.data.length}
        totalTestHistory={testHistoryListData.data.length}
        totalBlog={BlogListData.data.length}
      />
    </div>
  );
}
