export const dynamic = "force-static";

export async function GET(req: Request) {
  const now = new Date();
  const [yyyy, mm, dd] = [
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
  ];

  const parsedDate = new Date(
    `${yyyy}-${mm.toString().padStart(2, "0")}-${dd
      .toString()
      .padStart(2, "0")}T04:00:00Z`
  );

  return Response.json({ hello: "boop" });
}
