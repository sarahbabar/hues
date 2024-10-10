import {
  formatImageString,
  GameState,
  getTextColour,
  timer,
} from "@/lib/helpers";
import { AnimatePresence, motion } from "framer-motion";
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

  // if (gameState === "playing" || gameState === "idle") {
  //   return;
  // }

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
    <AnimatePresence>
      {(gameState === "won" || gameState === "lost") && (
        <motion.div
          className="fixed top-[30%] w-[380px] h-[390px] z-50 bg-white flex flex-col 
                          justify-center rounded-sm border-[3px] border-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <div className="flex relative">
            <button
              className="-top-4 right-3 text-3xl absolute flex items-center md:hover:scale-110 transition ease-in-out duration-200"
              onClick={() => setGameState("idle")}
              // onClick={() => setIsVisible(!isVisible)}
            >
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
                  copyImgToClipboard(
                    formatImageString(guesses, gameState, row)
                  );
                }}
              >
                Share Results
              </button>
              {copy && (
                <div className="text-base absolute uppercase bottom-3">
                  copied!
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
