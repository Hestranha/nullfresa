import "./ui/global.css"
import { comfortaa } from "./ui/fonts";
import NavBar from "./ui/structure/navbar";
import Footer from "./ui/structure/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>nullfresa</title>
      <body className={`${comfortaa.className} antialiased`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
