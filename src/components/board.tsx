"use client";
import {
  EMPTY,
  GameState,
  getTextColour,
  hexToInt,
  intToHex,
} from "@/lib/helpers";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Board({
  board,
  setBoard,
  currRow,
  currBox,
  setBox,
  guesses,
  submitGuess,
  target,
  gameState,
  checkGame,
}: {
  board: number[][];
  setBoard: any;
  currRow: number;
  currBox: number;
  setBox: any;
  guesses: string[];
  submitGuess: any;
  target: string;
  gameState: GameState;
  checkGame: any;
}) {
  const setToBoard = (row: number, col: number, value: number) => {
    setBoard((currBoard: number[][]) => {
      const newBoard = [...currBoard];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }
    const handleKeyPress = ({ key }: { key: string }) => {
      //   console.log(`row: ${currRow}, box: ${currBox}, key: ${key}`);
      if (key === "Backspace") {
        if (currBox > 0) {
          // set w/ empty string
          setToBoard(currRow, currBox - 1, EMPTY);
          setBox((prevBox: number) => {
            return prevBox - 1;
          });
        }
        return;
      }
      if (key === "Enter") {
        return submitGuess();
      }
      if (/^[a-fA-F0-9]$/.test(key)) {
        key = key.toLowerCase();

        if (currBox > 5) {
          return;
        }
        setToBoard(currRow, currBox, hexToInt(key));
        setBox((prevBox: number) => {
          //   console.log("prev:", prevBox, "curr:", currBox);
          return prevBox + 1;
        });
      }
    };

    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [currRow, currBox, gameState]);

  const hint = (
    rowInd: number,
    boxInd: number,
    value: number
  ): [string, boolean] => {
    // "▲" "▼
    if (rowInd > currRow || (rowInd === currRow && gameState === "playing")) {
      return ["", false];
    }
    const targetArr = target.slice(1).split("").map(hexToInt);

    const difference: number = targetArr[boxInd] - value;
    if (difference === 0) {
      return ["♥", false];
    }

    // go down
    if (difference < 0) {
      if (Math.abs(difference) === 1 || Math.abs(difference) === 2) {
        return ["›", true];
      }
      return ["»", true];
    }
    // go up
    if (difference === 1 || difference === 2) {
      return ["‹", true];
    }
    return ["«", true];
  };

  return (
    <div>
      <div className="flex flex-col items-center space-y-4 mb-4">
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center space-x-1 relative items-center"
          >
            {row.map((box, boxIndex) => (
              <div key={boxIndex} className="flex flex-col items-center">
                <motion.div
                  className="w-12 h-12 md:w-16 md:h-16 border-[2.5px] md:border-[3px] 
                            border-foreground rounded-sm flex flex-col justify-center 
                            items-center text-xl font-bold uppercase relative"
                  style={{
                    ["backgroundColor" as any]: guesses[rowIndex],
                    ["color" as any]: getTextColour(guesses[rowIndex]),
                  }}
                  animate={{
                    backgroundColor: guesses[rowIndex],
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {intToHex(box)}

                  {(() => {
                    const [h, r] = hint(rowIndex, boxIndex, box);
                    return (
                      <div
                        className={`absolute top-0 right-1 text-sm ${
                          r ? "rotate-90" : ""
                        }`}
                      >
                        {h}
                      </div>
                    );
                  })()}
                </motion.div>
              </div>
            ))}

            <div
              className="absolute -left-5 md:-left-10 text-xl md:text-4xl "
              hidden={currRow !== rowIndex}
            >
              #
            </div>

            <div className="hidden md:block px-2 md:px-0 z-50 pt-2 fixed md:absolute -right-7 -top-[6.7rem] md:top-2 md:-right-[50px]">
              <button
                className="text-xl md:text-4xl 
              transition ease-in-out duration-100 md:hover:scale-110"
                hidden={gameState !== "idle" || currRow !== rowIndex}
                onClick={checkGame}
              >
                <img
                  alt="text-bubble"
                  src="/imgs/text_bubble.png"
                  width={40}
                ></img>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
