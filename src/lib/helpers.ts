export const randomColour = (oldDate: Date) => {
  const currentDate = new Date(oldDate.getTime());
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

export function formatImageString(
  guesses: string[],
  state: GameState,
  row: number
): string {
  const url =
    "https://cnvs.b-cdn.net/use/N4IgzglgXgpiBcBtArABlQGgGwCZkF0MQAzCAGxjAUVADsBDAWznhAAsBXSkIgYwHsAJixAAdWjAAeAFxgAnBmQAEAcy5gwlJQF4liUSABixkwYxKDADgCCAFgDMAYSxmLIG7awBOa66t2AdmQAET93O0tbUJ43D2t7aPxxKVkFemUAIxVHfjJ+DjkdNwBiGGFyg2SZeUUlMAE5GCKDAGVHAHkAJQBRJSwAehcxWnEKaTqARw56RpboJt0sVFGYcbAAB3peCFoVAA0igEZl2jG6ze3dgE0inBPxAAFHChmACgeBPLlXrJy8goAlADxCtxgB3cxsIoPYIQZi0SD8BGvYG0B4tVaGJHSV4GYSbOTSAowAC0jCR-AMqPRmOxc1gr2QyGpwTk9DBLWkch2KmstF4bH4jUEuJAAAkAKrdFquMFKfpKHDmezIcyoAB0qqUGuZjwx0gAMjsYI56OsWlMZjAUXrVpy5PwANYwADqEEE0jYrxw1PtTpgAAVGpo5AA3a3UwzkMg2kZo-VY2jSenWvAstkcrk8vkCoVlV71PPmOUKpVKSxanVqzWR6Ox8RgiCepQPAP0QSCHndSQFy2zeZKADUfUw2rV5lszKUwHESjnLf1RokpvNfYjs-nNOkiZxeJgBKJjTJFKpG7nW53KdeKtR86UZwAnkUTnfiELVOowEodh-KJovzOtB3neEDEL+GhKAAhLolQgNOZ7AXeZySM+CGIXOb6FBA35Aag8BYPBQHocRMIZp0MC8NI9C7BQrwQAAVGAa4pkOSiSOYD7mEx0z9rAXHMfMt7EehKG6Chw4bFsPJ7Gh6EAL6yYhW5-EKrzFOgGmoEJwkLnaXL+m6HperqRE6ei+nOkGlDyOGsY6ee+oqd8Hy5Kpah-kCinAQ8UZkDGqJeXeonaoF86Yd+OHavhhH2d5rLsva2b8oKwrvBw6zrPIvD0JorzuRoiAQPgALmAx3FWixw7iZMPEwCm-Rlk+EkCbADXVpWmqWNpsVsUU1WSZc+yhXOCmmcBw3fmBDxkBwjD0O8nxuZ+QIAHxKIcOCWDFPUOasTlqZp6DdcRo2xTAZCaNtO3Ka53zFMQD2Pcd8kTVufrOoZnqvIcz1Ke9gbBjZ65jSRvn+RNT66E1NUVQOEkXDyVxead86jSjc4TSAcmECAOWaNIVBIDjxBsswhO0BwflEI0mX0NICAU1TIB5PwmWCAzlNkEQwhkPQD4c35clAA?expires=18446744073709551615&signature=1315618d847f4eb7d8ff5edf763b367f";
  const ftdGuesses = JSON.stringify(
    guesses.map((str: string) => {
      if (str === "#ffffff80") {
        return "";
      }
      return str.substring(1);
    })
  );

  let score = "";
  if (state === "lost") {
    score = `":( you lost"`;
  } else {
    const numScore = row + 1;
    score = `"SCORE ${numScore.toString()}/6"`;
  }
  return `${url}&guesses=${ftdGuesses}&score=${score}&bgColour=ffffff`;
}

export function formatDate(d: Date): string {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

export function parseDate(date: string) {
  const regex = /^(?:1[0-2]?|[1-9])-(?:[1-9]|[12][0-9]|3[01])-20[0-9]{2}$/;
  if (regex.test(date)) {
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
  }
  return null;
}
