import submitTest from "@/app/lib/submitTest";
import { getTimeTest } from "@/app/redux/features/infoTestSlice";
import { useAppDispatch } from "@/app/redux/hook";
import { Button } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";

export default function SubmitTest() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [time, setTime] = useState("");

  const handleSubmitTest = async () => {
    const res = await submitTest();
    console.log(res);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(elapsedTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [elapsedTime]);

  useEffect(() => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const remainingSeconds = elapsedTime % 60;
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    if (hours > 0) {
      setTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    } else {
      setTime(`${formattedMinutes}:${formattedSeconds}`);
    }
  }, [elapsedTime]);

  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex flex-col gap-2">
        <span>Thời gian làm</span>
        <p className="font-semibold text-xl">{time || "00:00"}</p>
      </div>
      <Button
        variant="outlined"
        className="text-lg hover:opacity-100 hover:bg-blue-800 hover:text-white"
        onClick={handleSubmitTest}
      >
        Nộp bài
      </Button>
    </>
  );
}
