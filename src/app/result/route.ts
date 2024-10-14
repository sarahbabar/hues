import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const r = req.nextUrl.searchParams.get("r");
  if (r === null) {
    return;
  }
  try {
    const decoded = atob(r);
    const { score, guesses } = JSON.parse(decoded);

    //console.log(req.nextUrl.searchParams);
    const link =
      "https://cnvs.b-cdn.net/use/N4IgzglgXgpiBcBtArABlQGgGwCZkF0MQAzCAGxjAUVADsBDAWznhAAsBXSkIgYwHsAJixAAdWjAAeAFxgAnBmQAEAcy5gwlJQF4liUSABixkwYxKDADgCCAFgDMAYSxmLIG7awBOa66t2AdmQAET93O0tbUJ43D2t7aPxxKVkFemUAIxVHfjJ+DjkdNwBiGGFyg2SZeUUlMAE5GCKDAGVHAHkAJQBRJSwAehcxWnEKaTqARw56RpboJt0sVFGYcbAAB3peCFoVAA0igEZl2jG6ze3dgE0inBPxAAFHChmACgeBPLlXrJy8goAlADxCtxgB3cxsIoPYIQZi0SD8BGvYG0B4tVaGJHSV4GYSbOTSAowAC0jCR-AMqPRmOxc1gr2QyGpwTk9DBLWkch2KmstF4bH4jUEuJAAAkAKrdFquMFKfpKHDmezIcyoAB0qqUGuZjwx0gAMjsYI56OsWlMZjAUXrVpy5PwANYwADqEEE0jYrxw1PtTpgAAVGpo5AA3a3UwzkMg2kZo-VY2jSenWvAstkcrk8vkCoVlV71PPmOUKpVKSxanVqzWR6Ox8RgiCepQPAP0QSCHndSQFy2zeZKADUfUw2rV5lszKUwHESjnLf1RokpvNfYjs-nNOkiZxeJgBKJjTJFKpG7nW53KdeKtR86UZwAnkUTnfiELVOowEodh-KJovzOtB3neEDEL+GhKAAhLolQgNOZ7AXeZySM+CGIXOb6FBA35Aag8BYPBQHocRMIZp0MC8NI9C7BQrwQAAVGAa4pkOSiSOYD7mEx0z9rAXHMfMt7EehKG6Chw4bFsPJ7Gh6EAL6yYhW5-EKrzFOgGmoEJwkLnaXL+m6HperqRE6ei+nOkGlDyOGsY6ee+oqd8Hy5Kpah-kCinAQ8UZkDGqJeXeonaoF86Yd+OHavhhH2d5rLsva2b8oKwrvBw6zrPIvD0JorzuRoiAQPgALmAx3FWixw7iZMPEwCm-Rlk+EkCbADXVpWmqWNpsVsUU1WSZc+yhXOCmmcBw3fmBDxkBwjD0O8nxuZ+QIAHxKIcOCWDFPUOasTlqZp6DdcRo2xTAZCaNtO3Ka53zFMQD2Pcd8kTVufrOoZnqvIcz1Ke9gbBjZ65jSRvn+RNT66E1NUVQOEkXDyVxead86jSjc4TSAcmECAOWaNIVBIDjxBsswhO0BwflEI0mX0NICAU1TIB5PwmWCAzlNkEQwhkPQD4c35clAA?expires=18446744073709551615&signature=1315618d847f4eb7d8ff5edf763b367f";
    const ftdLink = `${link}&guesses=${guesses}&score=${score}&bgColour=ffffff`;

    const res = await fetch(ftdLink);
    const blob = await res.arrayBuffer();
    const headers = new Headers();
    headers.set("Content-Type", "image/png");
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
  } catch {
    return;
  }
}
