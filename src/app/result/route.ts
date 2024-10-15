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
      "https://cnvs.b-cdn.net/use/N4IgzglgXgpiBcBtArABlQGgGwCZUF0MQAzCAGxjAUVADsBDAWznhAAsBXSkIgYwHsAJixAAdWjAAeAFxgAnBmQAEAcy5gwlJQF4liUSABixkwYxKDADgCCAFgDMAYSxmLIG7awBOa64N+xHjcDfHEpWQV6ZTABORgdNwBlRwB5ACUAUSUsAHoXMVpxCmklMABHDno4xOh43SxUIpgSsAAHel4IWhUADQSARkbaYtL2zu6ATQS8cXEAAQAROXoAdwBJRnoVGAAKACMOgGsVOX4OWkFzTCVUAEpZ4ealFfM2BMWIZlpIfm+d+9oc0SzUMv2kOwMwnacmkHDiAFpGL9+AYAUCQWCarAdshkGilqtEtI5F0VNZaLw2Pw4oIISAABIAVQyiVcKyUOSUOHM9mQVwAdHyboK0cDpAAZLowRz0VqJCpVXai5pE06HGAAdQggmkbB2OFFxP46oACnFNHIAG5K+aGchkf4PdHSUG0aRY3Y4PHzAkrVWk8mU6kwWkxYPmdmc7lKSxC1CCgXewF2sgOgHiFYQXVKOYm+iCQSkjKSHblSrVWpKADU2WudfMtjxSmA4iUbZzYslEhlcoVcUdtHbHYxbrpUKqsIRSNoKJAAKHztd7tqO158-bIwAngkhkPiNTVOowEouofKJpjy3B0ON08wIcIK0EsQoppWze2xBiGeNDpdP4QGbd8PyHHJOTUc8EkhPZBBgvZ-GvED2wg39-xIYgMIwyxGgKJCh3vR8EmJLhgJvABfUihxGSQd0o9t9zkE8T0HVB4CwIDELwxZlhWNIYF4aR6G6CgdggAAqMtFQ9aslEkcxN3MSSK1gRS+xgD11zw2SEhoms2g6UkejotsKM4hcxUcfgyGpHY5gEay5B2FCwFuTSbzmFMyDNSh5GtAdjOHaRLIcnYAGJ0Aiu4AudVVjU1bVdVXNzzKNdV-LM9svyUABCAinyvLS2xo3Rd0KhimNPVj2IKwqF19f1ukDKkaVsjhWlaeReHoTQnKPRAIHwW5zHEpT1MrGtdNKNSPRyaNtz06balmxNE0sZLCuK7S9LGQyAqHUykL2zLvzmMgOE2Wz7Js5zXIAPiUfocEsDjavM5pgps8LIqijKPwOwqYDITQXtettnQ+xzQswzD1r+o6wbFWL1S1HU9X6WH3KRmBvItPyMYXTyByQ-6P23XR5qm8sxtgGT9PGFQJgefbxBJvCQDIwgQG6zRpCoJA6CYEQDl4Y5TnOQQeBAOEyAQdhpGkVowHgMCGF1ISIEB4h5AYC5KH5PZ4V4QRaH5CRpByMAqnoNgck4PXWm6dnOeIZZmD52gOFTIg4g6+hpAQD2vZAaz+A6iX4EDsgiGEMh6E3APPbIMigA?expires=18446744073709551615&signature=0ced79c421577841ce04594c2e3c5f77";
    const ftdLink = `${link}&guesses=${guesses}&score=${score}`;

    const res = await fetch(ftdLink);
    const blob = await res.arrayBuffer();
    const headers = new Headers();
    headers.set("Content-Type", "image/png");
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
  } catch {
    return;
  }
}
