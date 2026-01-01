import "./globals.css";
<meta name="viewport" content="width=device-width, initial-scale=1" />

export const metadata = {
  title: "Charlie Patton — Creative Technologist",
  description:
    "Creative Technologist and Psychological Engineer building user-focused, subconsciously powerful experiences.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
