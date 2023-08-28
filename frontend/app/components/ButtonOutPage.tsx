import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useCallback, useState } from "react";

interface ButtonOutPageProps {
  title: string;
  subTitle: string;
  children: React.ReactElement;
  variant?: "outlined";
  className?: string;
  onClick: () => void;
  color?: "red";
}

export default function ButtonOutPage({
  children,
  title,
  subTitle,
  variant,
  className,
  color,
  onClick,
}: ButtonOutPageProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    onClick();
  }, [onClick]);

  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <Button
        variant={variant}
        color={color}
        className={className}
        onClick={handleOpen}
      >
        {children}
      </Button>
      <Dialog open={open} handler={handleOpen} className="p-4 ">
        <DialogHeader className="px-0 py-1 text-base">{title}</DialogHeader>
        <DialogBody className="border-b-[1px] px-0 py-3 text-sm font-normal text-gray-900">
          {subTitle}
        </DialogBody>
        <DialogFooter className="pt-3 pb-0 flex gap-2 px-0">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 text-[12px] px-3 py-2 min-w-[80px]"
          >
            <span>Hủy</span>
          </Button>
          <Button
            onClick={handleConfirm}
            className="text-[12px] px-3 py-2 bg-[#008060] min-w-[80px]"
          >
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
