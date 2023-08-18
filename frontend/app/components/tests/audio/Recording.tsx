import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { BsFillMicFill } from "react-icons/bs";
import { ImPause2 } from "react-icons/im";
import { ReactMediaRecorder } from "react-media-recorder-2";

const Recording: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (recording) {
      timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
      setRecordingTime(0);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        setRecordingTime(0);
      }
    };
  }, [recording]);

  const handleRecordingStop = (blob: string) => {
    // Xử lý file audio blob sau khi ghi âm hoàn tất
    console.log(blob);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ReactMediaRecorder
      audio
      render={({ startRecording, stopRecording, mediaBlobUrl, status }) => (
        <div className="flex gap-4 flex-col">
          <div className="flex gap-4 items-center">
            {status === "recording" ? (
              <Button
                onClick={() => {
                  stopRecording();
                  setRecording(false);
                }}
                className="flex gap-2 items-center bg-gray-200 hover:bg-blue-200 text-black"
              >
                <ImPause2 size={14} />
                <span className="text-sm ">Dừng lại</span>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  startRecording();
                  setRecording(true);
                }}
                className="flex gap-2 items-center bg-[#E43A45]"
              >
                <BsFillMicFill size={14} />
                <span className="text-sm ">Thu âm</span>
              </Button>
            )}

            {status === "recording" && (
              <div className="text-gray-900 text-lg font-medium">
                {formatTime(recordingTime)}
              </div>
            )}
          </div>
          {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        </div>
      )}
      onStop={handleRecordingStop}
    />
  );
};

export default Recording;
