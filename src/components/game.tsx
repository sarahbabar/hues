"use client";
import {
  EMPTY,
  GameState,
  getTextColour,
  intToHex,
  randomColour,
  toSnailTime,
} from "@/lib/helpers";
import Board from "./board";
import Keyboard from "./keyboard";
import Popup from "./popup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";
import Menu from "./menu";
import { getStorageValue, setStorageValue } from "@/lib/storage";

export default function Game({
  id,
  prev,
  next,
}: {
  id: number;
  prev: number | null;
  next: number | null;
}) {
  const router = useRouter();
  const initial: number[][] = [];

  const [gameHistory, setGameHistory]: any = useState({});
  useEffect(() => {
    const gH = getStorageValue("history", {});
    console.log("game history", gH);
    setGameHistory(gH);
  }, []);

  for (let j = 0; j < 6; j++) {
    const temp = new Array(6).fill(EMPTY);
    initial.push(temp);
  }

  const [scope, animate] = useAnimate();

  const [board, setBoard] = useState(initial);

  // useEffect(() => {
  //   console.log("saving board", board);
  //   setStorageValue("board", board);
  // }, [board]);

  const [row, setRow] = useState(0);
  const [box, setBox] = useState(0);
  const [target, _setTarget] = useState(randomColour(toSnailTime(id)));

  const [guesses, setGuess] = useState([
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
    "#ffffff80",
  ]);

  useEffect(() => {
    const todaysHistory = gameHistory[id];
    if (todaysHistory === undefined) {
      return;
    }
    setBoard(todaysHistory);
    const newGuesses = [...guesses];

    let maxRow = 0;
    let won = false;
    for (let i = 0; i < 6; i++) {
      const r = todaysHistory[i];
      if (r.some((x: number) => x === 16)) {
        break;
      }
      const newGuess = "#" + r.map(intToHex).join("");
      newGuesses[i] = newGuess;
      maxRow = i;

      if (newGuess === target) {
        won = true;
        break;
      }
    }
    setGuess(newGuesses);
    setRow(maxRow);
    if (maxRow === 5 || won) {
      setGameState("idle");
    }
  }, [gameHistory]);

  const saveProgress = () => {
    gameHistory[id] = board;
    setStorageValue("history", gameHistory);
  };

  const submitGuess = () => {
    if (box === 6) {
      const newGuess = "#" + board[row].map(intToHex).join("");
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
    saveProgress();
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

  const [visible, setIsVisible] = useState(false);

  const handleDate = async (id: number | null) => {
    if (id === null) {
      return;
    }
    await animate(scope.current, { opacity: 0 }, { duration: 0.3 });
    router.push(`/game/${id}`);
  };

  const fadeIn = async () => {
    await animate([[scope.current, { opacity: 1 }, { duration: 0.1 }]]);
  };
  useEffect(() => {
    fadeIn();
  });

  return (
    <>
      <div className="absolute md:hidden z-50 top-5 right-2.5">
        <button
          className="text-xl md:text-4xl 
              transition ease-in-out duration-100 md:hover:scale-110"
          hidden={gameState !== "idle"}
          onClick={checkGame}
        >
          <img alt="text-bubble" src="/imgs/text_bubble.png" width={40}></img>
        </button>
      </div>

      <div className="z-50 absolute top-6 left-3 md:top-11 md:left-10">
        <button
          className="w-[25px] h-[25px] md:w-[45px] md:h-[45px]"
          onClick={() => setIsVisible(!visible)}
        >
          <img alt="menu" src="/imgs/menu_white_spread.png" className=""></img>
        </button>
      </div>

      <div className="flex items-center mt-2 mb-1 z-20">
        <button
          onClick={() => {
            handleDate(prev);
          }}
          disabled={prev === null}
          className="disabled:opacity-50"
        >
          <h2 className="mx-2 scale-y-150 text-base md:text-lg">◄</h2>
        </button>
        <h1 className="text-center mx-2 text-lg md:text-2xl">#{id}</h1>
        <button
          onClick={() => {
            handleDate(next);
          }}
          disabled={next === null}
          className="disabled:opacity-50"
        >
          <h2 className="mx-2 scale-y-150 text-base md:text-lg">►</h2>
        </button>
      </div>

      <div className="my-1 py-0.5 px-0.5 rounded-sm z-20 opacity-0" ref={scope}>
        <div className="flex flex-col items-center rounded-sm pb-3 px-2 md:py-5 md:px-5 uppercase">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div
                className="w-[308px] h-[85px] md:w-[405px] md:h-[120px] rounded-sm border-[2.5px] md:border-[3px] border-foreground 
        flex items-center justify-center bg-white/50"
              >
                <div
                  className="w-[293px] h-[70px] md:w-[385px] md:h-[100px] flex items-center justify-center md:py-5"
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
          checkGame={checkGame}
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

      <Menu visible={visible} setIsVisible={setIsVisible}></Menu>
    </>
  );
}
