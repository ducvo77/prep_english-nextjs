import submitTest from "@/app/lib/submitTest";
import {
  getCorrectAmount,
  getTimeTest,
} from "@/app/redux/features/infoTestSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import ButtonOutPage from "../ButtonOutPage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SubmitTestProps {
  data: Test;
  userAssignment: UserAssignment | undefined;
}

export default function SubmitTest({ data, userAssignment }: SubmitTestProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const infoData: InfoTestStates = useAppSelector(
    (state) => state.infoTestReducer
  );
  const answerData: AnswerState[] = useAppSelector(
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

  const handleSubmitTest = useCallback(async () => {
    const res = await submitTest(infoData, session?.user?.id, answerData);

    if (res) {
      toast.success("Nộp bài thành công!!");
      router.push(`/tests/${data.id}/results/${res.data.data.id}`);
    } else {
      toast.error("Nộp bài thất bại!!");
    }
  }, [answerData, data, infoData, router, session]);

  useEffect(() => {
    // Nộp bài khi hết thời gian
    if (!userAssignment && data.time === elapsedTime / 60) {
      handleSubmitTest();
    }
  }, [data, elapsedTime, handleSubmitTest, userAssignment]);

  useEffect(() => {
    const contentLength = answerData.map((item) => item.content).length;

    if (data.title.includes("writing") || data.title.includes("speaking")) {
      dispatch(getCorrectAmount({ correct_amount: contentLength }));
    } else {
      const valueResult = data.parts
        .map((item) =>
          item.data.map((item) => ({
            number: Number(item.number),
            answer: item.answer,
          }))
        )
        .flat();
      const valueAnswer = answerData.map((item) => item.content).flat();

      const correct_amount = valueResult.filter((value) =>
        valueAnswer.some(
          (item) => value.number === item.number && value.answer === item.answer
        )
      ).length;

      dispatch(getCorrectAmount({ correct_amount }));
    }
  }, [data, dispatch, answerData]);

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
          {userAssignment.data.number_correct +
            "/" +
            userAssignment.data.total_sentences}
        </span>
      ) : (
        <ButtonOutPage
          title="Bạn muốn nộp bài?"
          subTitle="Kết quả của bạn sẽ được lưu"
          variant="outlined"
          className="md:text-lg text-sm  hover:bg-primary text-primary hover:opacity-100 hover:text-white"
          onClick={handleSubmitTest}
        >
          <span>Nộp bài</span>
        </ButtonOutPage>
      )}
    </>
  );
}
