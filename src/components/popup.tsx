import {
  formatImageString,
  GameState,
  getTextColour,
  timer,
} from "@/lib/helpers";
import { useEffect, useState } from "react";

export default function Popup({
  setGameState,
  gameState,
  target,
  guesses,
  row,
}: {
  setGameState: any;
  gameState: GameState;
  target: string;
  guesses: string[];
  row: number;
}) {
  const [time, setTime] = useState("00:00:00");
  const [copy, setCopy] = useState(false);

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

  async function copyImgToClipboard(imgUrl: string) {
    try {
      const data = await fetch(imgUrl);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopy(true);
      setTimeout(() => setCopy(false), 5000);
      console.log("Image copied.");
    } catch (err) {
      setCopy(false);
      console.error(err);
    }
  }

  return (
    <div className="fixed top-[30%] w-[380px] h-[390px] z-50 bg-white flex flex-col justify-center rounded-sm border-[3px] border-foreground">
      <div className="flex relative">
        <button
          className="-top-4 right-3 text-3xl absolute flex items-center md:hover:scale-110 transition ease-in-out duration-200"
          onClick={() => setGameState("idle")}
          // onClick={() => setIsVisible(!isVisible)}
        >
          {/* <svg
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
          </svg> */}
          <img src="/imgs/cross_cursor.png"></img>
        </button>
      </div>

      <div className="flex flex-col text-xl items-center uppercase mt-6">
        {gameState === "won" && <div>♥ Yay, you won!</div>}
        {gameState === "lost" && <div>:&#40; better luck next time</div>}

        <div className="flex flex-col items-center text-center my-4">
          <div>The target colour was</div>
          <div
            className="w-min p-2 m-2 border-[3px] border-foreground rounded-sm"
            style={{
              ["backgroundColor" as any]: target,
              ["color" as any]: getTextColour(target),
            }}
          >
            {target}
          </div>
        </div>

        <div className="uppercase m-2">Next game in</div>
        <div className="text-center font-bold">{time}</div>

        <div className="mb-3 mt-8 uppercase flex flex-col items-center">
          {/* <div className="">
            <img src={formatImageString(guesses, gameState, row)}></img>
          </div> */}

          <button
            className="uppercase hover:scale-110 transition ease-in-out duration-200"
            onClick={() => {
              copyImgToClipboard(formatImageString(guesses, gameState, row));
            }}
          >
            Share Results
          </button>
          {copy && (
            <div className="text-base absolute uppercase bottom-3">copied!</div>
          )}
        </div>
      </div>
    </div>
  );
}