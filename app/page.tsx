import React from "react";
import DescargarInstagram from "./ui/instagram/descargarInstagram";
import DescargarTitok from "./ui/tiktok/descargarTiktok";
import Link from "next/link";

const Page: React.FC = () => {

  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-6 gap-2 bg-[#ccc] w-full">
      <Link href="/instagram" className="py-2 px-4 rounded-md text-white bg-purple-800 hover:bg-purple-900 transition-colors duration-300">
        Ir a principal
      </Link>
      <DescargarInstagram />
      <Link href="/tiktok" className="py-2 px-4 rounded-md text-white bg-neutral-800 hover:bg-neutral-900 transition-colors duration-300">
        Ir a principal
      </Link>
      <DescargarTitok />
    </main>
  );
};

export default Page;
