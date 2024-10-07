"use client";

import { EMPTY, hexToInt, intToHex } from "@/lib/helpers";

const letters: string[] = ["←", "A", "B", "C", "D", "E", "F", "↵"];
const nums: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function Keyboard({
  setBoard,
  currRow,
  currBox,
  setBox,
  submitGuess,
}: {
  setBoard: any;
  currRow: number;
  currBox: number;
  setBox: any;
  submitGuess: any;
}) {
  const setToBoard = (row: number, col: number, value: number) => {
    setBoard((currBoard: number[][]) => {
      const newBoard = [...currBoard];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  const handleKeyPress = (key: string) => {
    if (key === "←") {
      if (currBox > 0) {
        // set w/ empty string
        setToBoard(currRow, currBox - 1, EMPTY);
        setBox((prevBox: number) => {
          return prevBox - 1;
        });
      }
      return;
    }
    if (key === "↵") {
      //   if (currBox === 6) {
      //     const newGuess = "#" + board[currRow].map(intToHex).join("");
      //     setGuess((currGuesses: string[]) => {
      //       const newGuesses = [...currGuesses];
      //       newGuesses[currRow] = newGuess;
      //       return newGuesses;
      //     });
      //     setRow((prevRow: number) => {
      //       return prevRow + 1;
      //     });
      //     setBox(0);
      //   }
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

  return (
    <div className="flex flex-col items-center space-y-2 w-full z-20">
      <div className="flex space-x-2">
        {nums.map((num) => (
          <button
            className="w-14 h-14 bg-white/50 hover:bg-white duration-50 
            border-[3px] border-foreground rounded-sm text-xl flex items-start justify-start px-0.5
            hover:scale-110 transition "
            key={num}
            onClick={(e) => {
              (e.target as HTMLButtonElement).blur();
              handleKeyPress(num);
            }}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex space-x-2">
        {letters.map((letter) => (
          <button
            className="w-14 h-14 bg-white/50 hover:bg-white duration-100 
            border-[3px] border-foreground rounded-sm text-xl flex items-start justify-start px-0.5
            hover:scale-110 transition "
            key={letter}
            onClick={(e) => {
              (e.target as HTMLButtonElement).blur();
              handleKeyPress(letter);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
