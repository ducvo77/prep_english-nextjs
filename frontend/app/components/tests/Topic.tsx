"use client";

import getTestDetail from "@/app/actions/getTestDetail";
import { memo, useEffect, useMemo, useState } from "react";

interface DataTypes {
  id: number;
  name: string;
  topic: {
    content: string;
  };
  data: {};
}

const initialData: DataTypes = {
  id: NaN,
  name: "",
  topic: {
    content: "",
  },
  data: {},
};

function Topic() {
  const [data, setData] = useState<DataTypes>(initialData);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestDetail();
      setData(res.data);
    };
    fetchData();
  }, []);

  const htmlString = useMemo(() => data?.topic?.content, [data]);

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default memo(Topic);
