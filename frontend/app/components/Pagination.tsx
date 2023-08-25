"use client";

import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  active: number;
  setActive: (n: number) => void;
  length: number;
  count: number;
}

export default function Pagination({
  active,
  setActive,
  length,
  count,
}: PaginationProps) {
  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
      className: "rounded-full",
    } as any);

  const next = () => {
    if (active === Math.ceil(length / count)) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const items = [];

  for (let i = 1; i <= Math.ceil(length / count); i++) {
    items.push(
      <IconButton
        key={i}
        {...getItemProps(i)}
        className={`rounded-full text-sm text-white ${
          active === i
            ? "bg-primary hover:bg-primary "
            : "bg-second hover:bg-primary"
        }`}
      >
        {i}
      </IconButton>
    );
  }

  return (
    <div className="flex items-center justify-center py-4 gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{items}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === Math.ceil(length / count)}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
