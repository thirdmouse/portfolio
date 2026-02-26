import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

<meta name="viewport" content="width=device-width, initial-scale=1" />
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export const metadata = {
  title: "Charlie Patton || Third Mouse Media",
  description:
    "Creative Technologist and Psychological Engineer building user-focused, subconsciously powerful experiences.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
        <Analytics />
        </body>
    </html>
  );
}
