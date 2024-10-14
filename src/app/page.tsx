import Game from "@/components/game";
import { getTodayID, minTime, oneDayMs } from "@/lib/helpers";

export default function Home() {
  const todayGameID = getTodayID();
  const prev = todayGameID - 1;

  return <Game id={todayGameID} prev={prev} next={null}></Game>;
}
