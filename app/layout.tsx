import "./ui/global.css"
import { comfortaa } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>nullfresa</title>
      <body className={`${comfortaa.className} antialiased`}>{children}</body>
    </html>
  );
}
