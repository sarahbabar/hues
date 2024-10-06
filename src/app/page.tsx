"use client";

import Board from "@/components/board";
import Keyboard from "@/components/keyboard";
import { colorIsDarkAdvanced, randomColour } from "@/lib/helpers";
import { useState } from "react";

export default function Home() {
  // let date: string = new Date().toLocaleString().split(",")[0];
  const initial: string[][] = [];

  for (let j = 0; j < 6; j++) {
    const temp = new Array(6).fill("");
    initial.push(temp);
  }

  const [board, setBoard] = useState(initial);
  const [row, setRow] = useState(0);
  const [box, setBox] = useState(0);
  console.log(box);
  const [target, setTarget] = useState(randomColour());
  const textColour = colorIsDarkAdvanced(target) ? "#ffffff" : "#000000";

  // setting guess for game logic
  // let guesses: string[] = [];
  // let currentGuess: number = 0;
  // let won: boolean = false;

  // function checkGuess(guess: string): any[] {
  //   const hex: string = "#" + guess;
  //   if (hex === target) {
  //     won = true;
  //     currentGuess++;
  //     return [hex, won];
  //   }
  //   let splitGuess: string[] = guess.split("");
  //   currentGuess++;
  //   guesses.push(hex);
  //   return [hex, won];
  // }

  return (
    <div className="flex flex-col items-center font-departure text-foreground">
      <div className="bg-foreground w-full mb-5">
        <h1 className="text-7xl font-departure uppercase font-bold text-center mt-3 mx-2 text-background hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-fuchsia-500 hover:to-cyan-500">
          hues
        </h1>
        <p className="uppercase text-background text-base text-center mb-3 mt-1">
          guess the hex
        </p>
      </div>

      <div className="w-4 h-4 blob1 pointer-events-none"></div>

      <div className="flex items-center">
        <button>
          <h2 className="mx-2 scale-y-150 text-lg">◄</h2>
        </button>
        <h1 className="text-center mx-2 text-2xl">meow</h1>
        <button>
          <h2 className="mx-2 scale-y-150 text-lg">►</h2>
        </button>
      </div>

      <div className="my-1 py-0.5 px-0.5 rounded-sm z-20">
        <div className="flex flex-col items-center rounded-sm py-5 px-5 uppercase">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-[405px] h-[120px] rounded-sm border-[3px] border-foreground flex items-center justify-center py-1 px-1 bg-white/50">
                <div
                  className="w-[385px] h-[100px] flex items-center justify-center py-5"
                  style={{ ["backgroundColor" as any]: target }}
                >
                  <h2
                    className="font-departure text-xl"
                    style={{ ["color" as any]: textColour }}
                  >
                    Target Colour
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* <h1>{randomColour()}</h1> */}

          {/* <div className="flex flex-row space-x-5 mt-4">
            {values.map((value: string, index: number) => (
              <div key={index} className="flex flex-col items-center">
                <button className="scale-x-150"> ▲ </button>
                <input
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => inputChange(index, e)}
                  className="w-16 h-16 bg-white/50 border-[3px] border-foreground rounded-sm flex flex-col justify-between text-center text-2xl"
                  pattern="[A-F0-9]"
                ></input>
                <button className="scale-x-150"> ▼ </button>
              </div>
            ))}
          </div> */}
        </div>

        <Board
          board={board}
          setBoard={setBoard}
          currRow={row}
          setRow={setRow}
          currBox={box}
          setBox={setBox}
        ></Board>
      </div>

      <Keyboard
        setBoard={setBoard}
        currRow={row}
        setRow={setRow}
        currBox={box}
        setBox={setBox}
      ></Keyboard>

      <div className="fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none repeatBG"></div>
    </div>
  );
}
