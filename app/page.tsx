import React from "react";
import Link from "next/link";

const Page: React.FC = () => {

  return (
    <main className="flex flex-col py-24 items-center min-h-screen gap-2 bg-white w-full">
      <header className="flex flex-col justify-center items-center gap-2 p-4 text-center w-full lg:w-4/5 xl:w-4/6">
        <h1 className="text-4xl tracking-widest font-bold">null<span className="text-red-600">fresa</span></h1>
        <p>Explora nuestras secciones para acceder a diferentes servicios.</p>
      </header>
      <section className="flex flex-col p-4 px-6 gap-10 w-full lg:w-4/5 xl:w-4/6">
        <article className="flex flex-col gap-3">
          <h2 className="uppercase font-bold text-purple-800">Descargador de Instagram</h2>
          <p className="text-sm">
            Accede a contenido de Instagram y realiza descargas directas, incluyendo la opción de ver historias de manera anónima con solo ingresar el nombre de usuario.
          </p>
          <Link href="/instagram" className="w-fit py-2 px-4 rounded-md text-white bg-purple-800 hover:bg-purple-900 transition-colors duration-300">
            Ir a principal →
          </Link>
        </article>
        <article className="flex flex-col gap-3">
          <h2 className="uppercase font-bold">Descargador de TikTok</h2>
          <p className="text-sm">
            Accede a descargas desde TikTok, que incluyen la opción de descargar múltiples TikToks. Ten en cuenta que para esta función pueden ser necesarios varios pasos adicionales.
          </p>
          <Link href="/tiktok" className="w-fit py-2 px-4 rounded-md text-white bg-neutral-800 hover:bg-neutral-900 transition-colors duration-300">
            Ir a principal →
          </Link>
        </article>
      </section>
    </main>
  );
};

export default Page;
