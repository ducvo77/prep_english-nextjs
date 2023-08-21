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
}

export default function ButtonOutPage({
  children,
  title,
  subTitle,
  variant,
  className,
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
      <Button variant={variant} className={className} onClick={handleOpen}>
        {children}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-xl">{title}</DialogHeader>
        <DialogBody divider>{subTitle}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
