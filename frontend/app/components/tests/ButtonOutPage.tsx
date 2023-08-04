// import { clearAnswer } from "@/app/redux/features/answerSlice";
// import { clearInfoTest } from "@/app/redux/features/infoTestSlice";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import { useRouter } from "next/navigation";
// import { useCallback, useState } from "react";
// import { useDispatch } from "react-redux";

// interface ButtonOutPageProps {
//   title: string;
//   subtitle: string;
// }

// export default function ButtonOutPage({ title, subtitle }: ButtonOutPageProps) {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const handleConfirm = useCallback(() => {
//     router.push("/");
//     dispatch(clearAnswer());
//     dispatch(clearInfoTest());
//     setOpen(false);
//   }, [router, dispatch]);

//   const handleOpen = useCallback(() => {
//     setOpen(!open);
//   }, [open]);
//   return (
//     <>
//       <Button
//         onClick={handleOpen}
//         variant="outlined"
//         className="p-2 text-xs capitalize"
//       >
//         Thoát
//       </Button>
//       <Dialog open={open} handler={handleOpen}>
//         <DialogHeader>{title}</DialogHeader>
//         <DialogBody divider>{subtitle}</DialogBody>
//         <DialogFooter>
//           <Button
//             variant="text"
//             color="red"
//             onClick={handleOpen}
//             className="mr-1"
//           >
//             <span>Hủy</span>
//           </Button>
//           <Button variant="gradient" color="green" onClick={handleConfirm}>
//             <span>Xác nhận</span>
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </>
//   );
// }
