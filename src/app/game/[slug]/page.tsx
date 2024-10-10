"use server";
import Game from "@/components/game";
import { parseDate, randomColour } from "@/lib/helpers";
import { Metadata, ResolvingMetadata, Viewport } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const date = parseDate(params.slug);
  const colour = date ? randomColour(date).substring(1) : "19191c";
  const prevImg =
    "https://cnvs.b-cdn.net/use/N4IgzglgXgpiBcBtAjAJgAzoDQDYAs6AuliAGYQA2MYCioAdgIYC2c8IAFgK7UgkDGAewAmbEAB16MAB4AXGACcmFAARNWKgLwrxIABIBVAKIBlXZJnyljVaLD8tOkAHFjJkyoAqeoyp8ANcyk5RWUVWUYFAHMYWUddAGIcVGFGAE4cIKo4oQpBLgVHAAFcwQUACgjo2IBKSWyVAHcsFQ5igBEIVnpIQR7yuvpJIoBhKkjy0oLB4ZNYgDE+2XLdUQAHSNkCmABaZj7BXUGiudlF+lkTaBhyjHRj9oVGRpNZBQh6KIBBen4OMpgwnK6hgLUaAHpUC1yhxITUVDsVABWbAqdAAOiRLQxSOOpwAMh8YCNGGsTABHLiRG542KvBSCADWMAA6hBhLIOOVcZJefQIKQVEUKFxmIxJoI8tMVAA+FRoAAcKmAkhUaqFpxGkrK5QSmH190kAF8LBQwDAVfR1RrYlq8hUEqQnc7Bib6Cc3kyYAAFBTURQANxpw3mlAoAz5JwWSyusHKCsN7sez3pH2+v3+fqBdn4YMh0NhqHhAGp5ZgVNjMZWee7QxRwzMk09GgAlGD8CKfKgjGAXRSA8oQqGtfPy5CYFpIgi0y6e5lsjlc8d4ufBq3WjdqkBG4ggRhgc2yGhIXekJ6sY-0Lj1kh+tYwRiyBBXm8gPKCe-CZ-XigkUQURgAE9v3rI0gA?expires=18446744073709551615&signature=661ada6b4e60a1287c1728c34b0facdf";

  return { openGraph: { images: [`${prevImg}&target=${colour}`] } };
}

export async function generateViewport({
  params,
}: {
  params: { slug: string };
}): Promise<Viewport> {
  const date = parseDate(params.slug);
  const colour = date ? randomColour(date) : "19191c";
  return { themeColor: colour };
}

export default async function Archive({
  params,
}: {
  params: { slug: string };
}) {
  const date = parseDate(params.slug);
  console.log(date);
  if (date === null) {
    redirect("/");
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (date.getTime() > now.getTime()) {
    redirect("/");
  }
  return <Game date={date}></Game>;
}
