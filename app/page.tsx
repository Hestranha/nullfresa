import React from "react";
import DescargarInstagram from "./ui/instagram/descargar";
import DescargarTitok from "./ui/tiktok/descargarTiktok";

const Page: React.FC = () => {

  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-6 gap-2 bg-[#ccc] w-full">
      <DescargarInstagram />
      <DescargarTitok />
    </main>
  );
};

export default Page;
