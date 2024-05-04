import React from "react";
import DescargarInstagram from "./ui/instagram/descargar";
import DescargarTitok from "./ui/tiktok/descargarTiktok";

const Page: React.FC = () => {

  return (
    <main className="flex items-center min-h-screen flex-col gap-2 w-full bg-[#c636a0]">
      <DescargarInstagram />
    </main>
  );
};

export default Page;
