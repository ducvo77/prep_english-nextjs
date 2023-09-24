"use client";

import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  active: number;
  setActive: (n: number) => void;
  length: number;
  count: number;
  bg_color?: string;
}

export default function Pagination({
  active,
  setActive,
  length,
  count,
  bg_color,
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
            ? "bg-secondary hover:bg-secondary "
            : "bg-secondary bg-opacity-20 hover:bg-secondary text-secondary hover:text-white"
        }`}
      >
        {i}
      </IconButton>
    );
  }
  const buttonClass =
    "flex items-center gap-2 rounded-full text-secondary sm:flex hidden";
  return (
    <div className={`flex items-center justify-center py-4 gap-4 ${bg_color}`}>
      <Button
        variant="text"
        className={buttonClass}
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " />
        Trước
      </Button>
      <div className="flex items-center gap-2">{items}</div>
      <Button
        variant="text"
        className={buttonClass}
        onClick={next}
        disabled={active === Math.ceil(length / count) || length === 0}
      >
        Sau
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
