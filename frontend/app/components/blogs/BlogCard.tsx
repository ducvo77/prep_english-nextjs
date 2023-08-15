"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  data: Blog;
}

export default function BlogCard({ data }: BlogCardProps) {
  const router = useRouter();

  return (
    <Card className="mt-6">
      <CardHeader color="blue-gray" className="relative h-auto">
        <Image
          src="/images/blog-card.jpeg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-base">
          {data.title}
        </Typography>
        <Typography className="description-blog text-sm text-gray-900">
          {data.introduction.content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={() => router.push(`/blogs/${data.id}`)}>
          Đọc thêm
        </Button>
      </CardFooter>
    </Card>
  );
}
