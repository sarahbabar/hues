"use client";

const letters: string[] = ["←", "A", "B", "C", "D", "E", "F", "↵"];
const nums: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function Keyboard({
  setBoard,
  currRow,
  setRow,
  currBox,
  setBox,
}: {
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

  const handleKeyPress = (key: string) => {
    console.log(`row: ${currRow}, box: ${currBox}, key: ${key}`);
    if (key === "←") {
      if (currBox > 0) {
        setToBoard(currRow, currBox - 1, "");
        setBox((prevBox: number) => {
          return prevBox - 1;
        });
      }
      return;
    }
    if (key === "↵") {
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
