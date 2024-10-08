export const randomColour = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const sinceEpoc: number = currentDate.getTime();

  // h: 0, 360
  // S: 22, 100
  // L: 30, 82
  const h = wrapClamp(sinceEpoc, 0, 360);
  const s = wrapClamp(sinceEpoc, 30, 100);
  const l = wrapClamp(sinceEpoc, 30, 100);
  const hex = hslToHex(h, s, l);

  return hex;
};

export function wrapClamp(value: number, min: number, max: number) {
  const range = max - min + 1;
  return ((((value - min) % range) + range) % range) + min;
}

export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function colorIsDarkAdvanced(bgColor: string) {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L <= 0.179;
}

export function getTextColour(target: string) {
  return colorIsDarkAdvanced(target) ? "#ffffff" : "#000000";
}

export const EMPTY = 16;

// prettier-ignore
export function hexToInt(hex: string) {
  switch (hex) {
    case "0": return 0;
    case "1": return 1;
    case "2": return 2;
    case "3": return 3;
    case "4": return 4;
    case "5": return 5;
    case "6": return 6;
    case "7": return 7;
    case "8": return 8;
    case "9": return 9;
    case "a": return 10;
    case "b": return 11;
    case "c": return 12;
    case "d": return 13;
    case "e": return 14;
    case "f": return 15;
    case "": return EMPTY;
    default: throw new Error('Invalid hexadecimal value');
  }
}

// prettier-ignore
export function intToHex(int: number) {
  switch (int) {
    case 0: return "0";
    case 1: return "1";
    case 2: return "2";
    case 3: return "3";
    case 4: return "4";
    case 5: return "5";
    case 6: return "6";
    case 7: return "7";
    case 8: return "8";
    case 9: return "9";
    case 10: return "a";
    case 11: return "b";
    case 12: return "c";
    case 13: return "d";
    case 14: return "e";
    case 15: return "f";
    case 16: return "";
    default: throw new Error('Invalid integer value');
  }
}

export type GameState = "playing" | "won" | "lost" | "idle";

export function timer(deltaT: number): string {
  if (deltaT <= 0) {
    return "right now";
  }
  let hrs = Math.floor(deltaT / 3600);
  let rem = deltaT % 3600;
  let mins = Math.floor(rem / 60);
  rem = rem % 60;
  let secs = rem;

  // const hrs = date.getHours().toString().padStart(2, "0");
  // const mins = date.getMinutes().toString().padStart(2, "0");
  // const secs = date.getSeconds().toString().padStart(2, "0");

  if (hrs === 0 && mins === 0) {
    return `${secs}s`;
  }
  if (hrs === 0) {
    return `${mins}m ${secs}s`;
  }
  if (mins === 0) {
    return `${hrs}h ${secs}s`;
  }
  return `${hrs}h ${mins}m ${secs}s`;
}
