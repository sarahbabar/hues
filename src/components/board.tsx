"use client";
import { useEffect } from "react";

export default function Board({
  board,
  setBoard,
  currRow,
  setRow,
  currBox,
  setBox,
}: {
  board: string[][];
  setBoard: any;
  currRow: number;
  setRow: any;
  currBox: number;
  setBox: any;
}) {
  const setToBoard = (row: number, col: number, value: string) => {
    setBoard((currBoard: string[][]) => {
      const newBoard = [...currBoard];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  useEffect(() => {
    const handleKeyPress = ({ key }: { key: string }) => {
      console.log(`row: ${currRow}, box: ${currBox}, key: ${key}`);
      if (key === "Backspace") {
        if (currBox > 0) {
          setToBoard(currRow, currBox - 1, "");
          setBox((prevBox: number) => {
            return prevBox - 1;
          });
        }
        return;
      }
      if (key === "Enter") {
        if (currBox === 6) {
          setRow((prevRow: number) => {
            return prevRow + 1;
          });
          setBox(0);
        }
        return;
      }
      if (/^[a-fA-F0-9]$/.test(key)) {
        if (currBox > 5) {
          return;
        }
        setToBoard(currRow, currBox, key.toLowerCase());
        setBox((prevBox: number) => {
          console.log("prev:", prevBox, "curr:", currBox);
          return prevBox + 1;
        });
      }
    };

    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [currRow, currBox]);

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
                  className="w-16 h-16 bg-white/50 border-[3px] 
                            border-foreground rounded-sm flex justify-center 
                            items-center text-xl font-bold uppercase"
                >
                  {box}
                </div>
              </div>
            ))}

            <div
              className="absolute -left-10 text-4xl "
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
