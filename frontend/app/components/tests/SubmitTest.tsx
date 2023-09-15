import submitTest from "@/app/lib/submitTest";
import {
  getCorrectAmount,
  getTimeTest,
} from "@/app/redux/features/infoTestSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useSession } from "next-auth/react";
import { memo, useEffect, useMemo, useState } from "react";
import ButtonOutPage from "../ButtonOutPage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SubmitTestProps {
  data: Test;
  userAssignment: UserAssignment | undefined;
}

function SubmitTest({ data, userAssignment }: SubmitTestProps) {
  const router = useRouter();
  const { data: session }: any = useSession();
  const jwt = useMemo(() => session?.user?.id, [session]);
  const dispatch = useAppDispatch();

  const infoData: InfoTestStates = useAppSelector(
    (state) => state.infoTestReducer
  );
  const answerData: AnswerState[] = useAppSelector(
    (state) => state.answerReducer
  );

  const timeTypeNumber = () => {
    const [minutes, seconds] = infoData.time
      ? infoData.time.split(":")
      : ["0", "0"];

    return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  };

  const [elapsedTime, setElapsedTime] = useState(timeTypeNumber);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (userAssignment) return;

    const interval = setInterval(() => {
      setElapsedTime(elapsedTime + 1);
    }, 1000);
    if (data.time === elapsedTime / 60) {
      return () => clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [elapsedTime, userAssignment, data]);

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

  const handleSubmitTest = async () => {
    const res = await submitTest(infoData, jwt, answerData);

    if (res) {
      toast.success("Nộp bài thành công!!");
      router.push(`/tests/${data.id}/results/${res.data.data.id}`);
    } else {
      toast.error("Nộp bài thất bại!!");
    }
  };

  useEffect(() => {
    // Nộp bài khi hết thời gian
    if (userAssignment) return;
    if (data.time === elapsedTime / 60) handleSubmitTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, elapsedTime, userAssignment]);

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

export default memo(SubmitTest);
