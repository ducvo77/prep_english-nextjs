import getTest from "@/app/actions/getTest";
import { useEffect, useState } from "react";

export default function Topic() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTest();
      setData(data.data);
    };
    fetchData();
  }, []);
  //   console.log(data.topic.content);
  const htmlString = data?.topic?.content;

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}
