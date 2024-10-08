import { GameState, timer } from "@/lib/helpers";
import { useEffect, useState } from "react";

export default function Popup({
  setGameState,
  gameState,
}: {
  setGameState: any;
  gameState: GameState;
}) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      const difference = nextDay.getTime() - now.getTime();

      let seconds = Math.floor(difference / 1000);
      setTime(timer(seconds));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (gameState === "playing" || gameState === "idle") {
    return;
  }
  return (
    <div className="fixed top-1/4 w-[450px] h-[500px] z-50 bg-white flex flex-col border-[3px] border-foreground">
      <div className="flex justify-end">
        <button
          className="text-3xl mx-2 my-3 flex items-center"
          onClick={() => setGameState("idle")}
          // onClick={() => setIsVisible(!isVisible)}
        >
          <svg
            className="scale h-16 w-16"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 78 97.5"
            enableBackground="new 0 0 78 78"
          >
            <g>
              <rect x="54" y="54" width="6" height="6" />
              <rect x="36" y="36" width="6" height="6" />
              <rect x="30" y="42" width="6" height="6" />
              <rect x="24" y="48" width="6" height="6" />
              <rect x="18" y="54" width="6" height="6" />
              <rect x="42" y="30" width="6" height="6" />
              <rect x="48" y="24" width="6" height="6" />
              <rect x="54" y="18" width="6" height="6" />
              <rect x="42" y="42" width="6" height="6" />
              <rect x="48" y="48" width="6" height="6" />
              <rect x="30" y="30" width="6" height="6" />
              <rect x="18" y="18" width="6" height="6" />
              <rect x="24" y="24" width="6" height="6" />
            </g>
          </svg>
        </button>
      </div>

      <div className="flex flex-col text-2xl items-center uppercase">
        {gameState === "won" && <div>♥ Yay, you won!</div>}
        {gameState === "lost" && <div>:&#40; better luck next time</div>}
        <div className="uppercase m-4">Next game in:</div>
        <div className="text-center">{time}</div>

        <div></div>
      </div>
    </div>
  );
}
