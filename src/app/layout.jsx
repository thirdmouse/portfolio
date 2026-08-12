import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Charlie Patton",
  description:
    "Creative Technologist and Experience Designer building user-focused, subconsciously powerful experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}