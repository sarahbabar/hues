export function getSecondSundayOfMarch(year: number): Date {
  const date = new Date(Date.UTC(year, 2, 1)); // March 1st
  const dayOfWeek = date.getUTCDay();
  const firstSunday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const secondSunday = firstSunday + 7;
  return new Date(Date.UTC(year, 2, secondSunday));
}

export function getFirstSundayOfNovember(year: number): Date {
  const date = new Date(Date.UTC(year, 10, 1)); // November 1st
  const dayOfWeek = date.getUTCDay();
  const firstSunday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  return new Date(Date.UTC(year, 10, firstSunday));
}

export function isDST(date: Date): boolean {
  const year = date.getUTCFullYear();
  const secondSundayMarch = getSecondSundayOfMarch(year);
  const firstSundayNovember = getFirstSundayOfNovember(year);

  return date >= secondSundayMarch && date < firstSundayNovember;
}

export function parseDateEST(dateStr: string) {
  const regex = /^(?:1[0-2]?|[1-9])-(?:[1-9]|[12][0-9]|3[01])-20[0-9]{2}$/;
  if (regex.test(dateStr)) {
    try {
      const [mm, dd, yyyy] = dateStr.split("-").map((i) => parseInt(i, 10));
      const date = new Date(Date.UTC(yyyy, mm - 1, dd, 0, 0, 0));
      const offset = isDST(date) ? 4 : 5;
      const estTime = new Date(date.getTime() - offset * 60 * 60 * 1000);
      return estTime;
    } catch {
      return null;
    }
  }
  return null;
}

export function dateEST(): Date {
  const nowUTC = new Date();
  const offsetHours = isDST(nowUTC) ? 4 : 5; // EDT is UTC-4, EST is UTC-5

  // Adjust the current UTC time to EST
  const estTime = new Date(nowUTC.getTime() - offsetHours * 60 * 60 * 1000);
  return estTime;
}
