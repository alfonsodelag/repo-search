import { FC, MouseEventHandler, useRef, useState } from "react";

interface RevalidateButtonProps {
  error: Error;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const RevalidateButton: FC<RevalidateButtonProps> = ({ onClick, error }) => {
  const timer = useRef<number | null>(null);
  const [time, setTime] = useState(0);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    setTime(5);

    timer.current = window.setInterval(() => {
      setTime((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
  };

  return (
    <button
      className={`${
        time !== 0
          ? "opacity-70 cursor-not-allowed"
          : "hover:border-black hover:text-black"
      } appearance-none inline-flex items-center justify-center text-center leading-6 whitespace-nowrap w-full min-w-auto h-10 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out select-none focus:outline-none box-border ${
        time !== 0 ? "border-gray-300 text-gray-400" : "border-black text-black"
      }`}
      disabled={time !== 0}
      onClick={(event) => {
        startTimer();
        onClick(event);
      }}
    >
      {error.message} :(
      {time === 0
        ? " Click here to try again."
        : ` Click here after ${time} seconds.`}
    </button>
  );
};

export default RevalidateButton;
