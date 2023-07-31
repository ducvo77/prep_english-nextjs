import { clearAnswer } from "@/app/redux/features/answerSlice";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export default function ButtonOutPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleConfirm = useCallback(() => {
    router.push("/#practice");
    dispatch(clearAnswer());
    setOpen(false);
  }, [router, dispatch]);
  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        className="p-2 text-xs capitalize"
      >
        Thoát
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Thoát trang web?</DialogHeader>
        <DialogBody divider>
          Những thay đổi bạn đã thực hiện có thể không được lưu.
        </DialogBody>
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
