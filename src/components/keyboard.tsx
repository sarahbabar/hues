"use client";

import { EMPTY, GameState, hexToInt, intToHex } from "@/lib/helpers";

const letters: string[] = ["↵", "A", "B", "C", "D", "E", "F", "←"];
const nums: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function Keyboard({
  setBoard,
  currRow,
  currBox,
  setBox,
  submitGuess,
  gameState,
}: {
  setBoard: any;
  currRow: number;
  currBox: number;
  setBox: any;
  submitGuess: any;
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
    <div className="flex flex-col items-center space-y-2 w-full z-20 mb-7">
      <div className="flex space-x-0.5 md:space-x-2">
        {nums.map((num) => (
          <button
            className="w-8 h-12 md:w-14 md:h-14 bg-white/50 hover:bg-white disabled:hover:bg-white/50 duration-50 
            border-[2.5px] md:border-[3px] border-foreground rounded-sm text-xl flex items-start justify-start px-0.5
            md:hover:scale-110 disabled:hover:scale-100 transition disabled:opacity-60 md:active:scale-95"
            key={num}
            onClick={(e) => {
              (e.target as HTMLButtonElement).blur();
              handleKeyPress(num);
            }}
            disabled={gameState !== "playing"}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex space-x-0.5 md:space-x-2">
        {letters.map((letter) => (
          <button
            className="w-8 h-12 md:w-14 md:h-14 bg-white/50 hover:bg-white disabled:hover:bg-white/50 duration-100 
            border-[2.5px] md:border-[3px] border-foreground rounded-sm text-xl flex items-start justify-start px-0.5
            md:hover:scale-110 disabled:hover:scale-100 transition disabled:opacity-60 md:active:scale-95"
            key={letter}
            onClick={(e) => {
              (e.target as HTMLButtonElement).blur();
              handleKeyPress(letter);
            }}
            disabled={gameState !== "playing"}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
