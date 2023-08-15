import submitTest from "@/app/lib/submitTest";
import { getTimeTest } from "@/app/redux/features/infoTestSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonOutPage from "../ButtonOutPage";
import { useRouter } from "next/navigation";

interface SubmitTestProps {
  data: Test;
  userAssignment: UserAssignment | undefined;
}

export default function SubmitTest({ data, userAssignment }: SubmitTestProps) {
  const router = useRouter();

  const infoData: InfoTestStates = useAppSelector(
    (state) => state.infoTestReducer
  );
  const answerData: AnswerState = useAppSelector(
    (state) => state.answerReducer
  );
  const { data: session }: any = useSession();

  const timeTypeNumber = () => {
    const [minutes, seconds] = infoData.time
      ? infoData.time.split(":")
      : ["0", "0"];

    return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  };

  const [elapsedTime, setElapsedTime] = useState(timeTypeNumber);
  const [time, setTime] = useState("");

  const handleSubmitTest = async () => {
    const res = await submitTest(
      infoData,
      session?.user?.id || session?.user?.sub,
      answerData
    );

    if (res) router.push(`/tests/${data.id}/results/${res.data.data.id}`);
  };

  useEffect(() => {
    if (userAssignment) return;

    const interval = setInterval(() => {
      setElapsedTime(elapsedTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [elapsedTime, userAssignment]);

  useEffect(() => {
    if (userAssignment) return;

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
  }, [elapsedTime, userAssignment]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userAssignment) return;

    dispatch(getTimeTest({ time }));
  }, [time, dispatch, userAssignment]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <span>Thời gian làm</span>
        <p className="font-semibold text-xl">
          {userAssignment ? userAssignment.data.time : infoData.time || "00:00"}
        </p>
      </div>
      {userAssignment ? (
        <span className="text-green-700 font-semibold text-center border py-3 border-gray-600 text-lg">
          Đúng:{" "}
          {infoData.correct_amount + "/" + userAssignment.data.total_sentences}
        </span>
      ) : (
        <ButtonOutPage
          title="Bạn muốn nộp bài?"
          subTitle="Kết quả của bạn sẽ được lưu"
          variant="outlined"
          className="md:text-lg text-sm hover:opacity-100 hover:bg-blue-800 hover:text-white"
          onClick={handleSubmitTest}
        >
          <span>Nộp bài</span>
        </ButtonOutPage>
      )}
    </>
  );
}
