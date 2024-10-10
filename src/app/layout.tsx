import type { Metadata } from "next";
import "./globals.css";
export const runtime = "edge";

const prevImg =
  "https://cnvs.b-cdn.net/use/N4IgzglgXgpiBcBtAjAJgAzoDQDYAs6AuliAGYQA2MYCioAdgIYC2c8IAFgK7UgkDGAewAmbEAB16MAB4AXGACcmFAARNWKgLwrxIABIBVAKIBlXZJnyljVaLD8tOkAHFjJkyoAqeoyp8ANcyk5RWUVWUYFAHMYWUddAGIcVGFGAE4cIKo4oQpBLgVHAAFcwQUACgjo2IBKSWyVAHcsFQ5igBEIVnpIQR7yuvpJIoBhKkjy0oLB4ZNYgDE+2XLdUQAHSNkCmABaZj7BXUGiudlF+lkTaBhyjHRj9oVGRpNZBQh6KIBBen4OMpgwnK6hgLUaAHpUC1yhxITUVDsVABWbAqdAAOiRLQxSOOpwAMh8YCNGGsTABHLiRG542KvBSCADWMAA6hBhLIOOVcZJefQIKQVEUKFxmIxJoI8tMVAA+FRoAAcKmAkhUaqFpxGkrK5QSmH190kAF8LBQwDAVfR1RrYlq8hUEqQnc7Bib6Cc3kyYAAFBTURQANxpw3mlAoAz5JwWSyusHKCsN7sez3pH2+v3+fqBdn4YMh0NhqHhAGp5ZgVNjMZWee7QxRwzMk09GgAlGD8CKfKgjGAXRSA8oQqGtfPy5CYFpIgi0y6e5lsjlc8d4ufBq3WjdqkBG4ggRhgc2yGhIXekJ6sY-0Lj1kh+tYwRiyBBXm8gPKCe-CZ-XigkUQURgAE9v3rI0gA?expires=18446744073709551615&signature=661ada6b4e60a1287c1728c34b0facdf";

export const metadata: Metadata = {
  title: "HUES",
  description: "Guess the Hex",
  openGraph: { images: [`${prevImg}&target=19191c`] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <div className="flex flex-col items-center font-departure text-foreground ">
          <div className="bg-foreground w-full mb-1 md:mb-5 flex flex-col text-center items-center">
            <h1
              className="text-5xl md:text-7xl font-departure uppercase font-bold text-center mt-4 mx-2 
        text-background hover:text-transparent hover:bg-clip-text rainbow w-min transition ease-in-out duration-200"
            >
              hues
            </h1>
            <p className="uppercase text-background text-sm md:text-base text-center mb-4 mt-1">
              guess the hex
            </p>
          </div>

          {children}
          <div className="w-0 h-0 blob1 pointer-events-none fixed"></div>
        </div>
      </body>
    </html>
  );
}
