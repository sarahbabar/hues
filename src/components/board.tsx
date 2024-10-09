"use client";
import {
  EMPTY,
  GameState,
  getTextColour,
  hexToInt,
  intToHex,
} from "@/lib/helpers";
import { useEffect } from "react";

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
                <div
                  className="w-14 h-14 md:w-16 md:h-16 border-[3px] 
                            border-foreground rounded-sm flex flex-col justify-center 
                            items-center text-xl font-bold uppercase relative"
                  style={{
                    ["backgroundColor" as any]: guesses[rowIndex],
                    ["color" as any]: getTextColour(guesses[rowIndex]),
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
                </div>
              </div>
            ))}

            <div
              className="absolute -left-5 md:-left-10 text-xl md:text-4xl "
              hidden={currRow !== rowIndex}
            >
              #
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
