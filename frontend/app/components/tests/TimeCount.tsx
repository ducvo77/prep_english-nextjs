import { useEffect, useState } from "react";

export default function TimeCount() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [time, setTime] = useState("");

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

  return <>{time || "00:00"}</>;
}
