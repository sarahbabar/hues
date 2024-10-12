import Board from "@/components/board";
import Game from "@/components/game";
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
  UTCDate,
} from "@/lib/helpers";
import { dateEST } from "@/lib/time";
import { useEffect, useState } from "react";

export default function Home() {
  // let date: string = new Date().toLocaleString().split(",")[0];

  // const [isVisible, setIsVisible] = useState(false);

  // const canTravel = (travel: number) => {
  //   const now = new Date();
  //   now.setHours(0, 0, 0, 0);

  //   let next = new Date(date.getTime());
  //   next.setHours(0, 0, 0, 0);

  //   next = new Date(next.getTime() + 86400000 * travel);
  //   return next.getTime() > now.getTime() ? null : next;
  // };

  const date = dateEST();
  // const date = new Date(now.getTime() + 3600000 * 3);
  const prev = new Date(date.getTime() - 86400000);
  const next = new Date(date.getTime() + 86400000);
  console.log(prev, date, next);
  return (
    <Game
      date={date}
      prev={prev}
      next={next.getTime() > date.getTime() ? null : next}
    ></Game>
  );
}
