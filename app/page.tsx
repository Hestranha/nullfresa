import React from "react";
import DescargarInstagram from "./ui/inicio/descargar";

const Page: React.FC = () => {

  return (
    <main className="flex items-center min-h-screen flex-col gap-2 w-full">
      <DescargarInstagram />
    </main>
  );
};

export default Page;
