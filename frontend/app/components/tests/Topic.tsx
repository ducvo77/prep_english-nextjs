"use client";

import { memo, useMemo } from "react";

interface TopicProps {
  data: {
    topic: {
      content: string;
    };
  };
}

function Topic({ data }: TopicProps) {
  const htmlString = useMemo(() => data?.topic?.content, [data]);

  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export default memo(Topic);
