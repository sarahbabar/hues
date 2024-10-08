"use client";

import Board from "@/components/board";
import Keyboard from "@/components/keyboard";
import Popup from "@/components/popup";
import {
  colorIsDarkAdvanced,
  randomColour,
  getTextColour,
  EMPTY,
  intToHex,
  GameState,
  formatDate,
} from "@/lib/helpers";
import { useEffect, useState } from "react";

export default function Home() {
  // let date: string = new Date().toLocaleString().split(",")[0];
  const initial: number[][] = [];

  for (let j = 0; j < 6; j++) {
    const temp = new Array(6).fill(EMPTY);
    initial.push(temp);
  }

  const [board, setBoard] = useState(initial);
  const [row, setRow] = useState(0);
  const [box, setBox] = useState(0);
  console.log(box);
  const [target, setTarget] = useState(randomColour());

  const [guesses, setGuess] = useState([
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
  ]);

  const submitGuess = () => {
    if (box === 6) {
      const newGuess = "#" + board[row].map(intToHex).join("");
      //   console.log(newGuess);
      //   console.log(board);
      setGuess((currGuesses: string[]) => {
        const newGuesses = [...currGuesses];
        newGuesses[row] = newGuess;
        return newGuesses;
      });
      const state = checkGame();
      if (state === "playing") {
        setRow((prevRow: number) => {
          return prevRow + 1;
        });
        setBox(0);
      }
    }
    return;
  };

  const [gameState, setGameState] = useState<GameState>("playing");
  const checkGame = () => {
    const newGuess = "#" + board[row].map(intToHex).join("");
    if (newGuess === target) {
      setGameState("won");
      return "won";
    }
    if (row >= 0 && row < 5 && newGuess !== target) {
      setGameState("playing");
      return "playing";
    }
    if (row === 5 && newGuess !== target) {
      setGameState("lost");
      return "lost";
    }
    return "idle";
  };

  // const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col items-center font-departure text-foreground relative">
      <div className="bg-foreground w-full mb-1 md:mb-5 flex flex-col text-center items-center">
        <h1
          className="text-5xl md:text-7xl font-departure uppercase font-bold text-center mt-4 mx-2 
        text-background hover:text-transparent hover:bg-clip-text rainbow w-min transition ease-in-out duration-200"
        >
          hues
        </h1>
        <p className="uppercase text-background text-sm md:text-base text-center mb-4 mt-1">
          guess the hex
        </p>
      </div>

      <div className="w-4 h-4 blob1 pointer-events-none"></div>

      <div className="flex items-center my-1">
        <button>
          <h2 className="mx-2 scale-y-150 text-base md:text-lg">◄</h2>
        </button>
        <h1 className="text-center mx-2 text-lg md:text-2xl">
          {formatDate(new Date())}
        </h1>
        <button>
          <h2 className="mx-2 scale-y-150 text-base md:text-lg">►</h2>
        </button>
      </div>

      <div className="my-1 py-0.5 px-0.5 rounded-sm z-20">
        <div className="flex flex-col items-center rounded-sm pb-3 px-2 md:py-5 md:px-5 uppercase">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div
                className="w-[270px] h-[90px] md:w-[405px] md:h-[120px] rounded-sm border-[3px] border-foreground 
              flex items-center justify-center bg-white/50"
              >
                <div
                  className="w-[255px] h-[75px] md:w-[385px] md:h-[100px] flex items-center justify-center md:py-5"
                  style={{ ["backgroundColor" as any]: target }}
                >
                  <h2
                    className="font-departure text-xl"
                    style={{ ["color" as any]: getTextColour(target) }}
                  >
                    Target Colour
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Board
          board={board}
          setBoard={setBoard}
          currRow={row}
          currBox={box}
          setBox={setBox}
          guesses={guesses}
          submitGuess={submitGuess}
          target={target}
          gameState={gameState}
        ></Board>
      </div>

      <Keyboard
        setBoard={setBoard}
        currRow={row}
        currBox={box}
        setBox={setBox}
        submitGuess={submitGuess}
        gameState={gameState}
      ></Keyboard>

      <div className="fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none repeatBG"></div>

      <Popup
        setGameState={setGameState}
        gameState={gameState}
        target={target}
        guesses={guesses}
        row={row}
      ></Popup>
    </div>
  );
}
