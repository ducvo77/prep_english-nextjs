"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BlogCardProps {
  data: Blog;
}

export default function BlogCard({ data }: BlogCardProps) {
  const router = useRouter();

  return (
    <Card id="blog-card" className="mt-6">
      <CardHeader color="blue-gray" className="relative h-auto">
        <Image
          src={
            data.imageURL
              ? process.env.NEXT_PUBLIC_SOURCE_URL + data.imageURL[0].url
              : "/images/logo.png"
          }
          unoptimized={true}
          width={500}
          height={500}
          priority
          alt={data.title}
          className="w-full h-[164px]"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-base">
          {data.title}
        </Typography>
        <Typography className="description-blog text-sm text-gray-900 text-justify font-normal">
          <span dangerouslySetInnerHTML={{ __html: data.content }} />
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={() => router.push(`/blogs/${data.id}`)}
          className="bg-secondary"
        >
          Đọc thêm
        </Button>
      </CardFooter>
    </Card>
  );
}
