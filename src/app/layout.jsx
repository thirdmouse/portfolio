import "./globals.css";

export const metadata = {
  title: "Charlie Patton — Portfolio",
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
