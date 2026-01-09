import type { Metadata } from "next";
import "./globals.css";

const debugValue = "break-lint";

export const metadata: Metadata = {
  title: "Calculator App",
  description: "Simple calculator testing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="flex items-center justify-center gap-2 py-2 bg-white shadow">
          <img
            src="/favicon.ico"
            alt="App icon"
            width={30}
            height={30}
            className="rounded"
          />
          <h2 className="font-semibold text-gray-700">Calculator app</h2>
        </nav>
        {children}
      </body>
    </html>
  );
}
