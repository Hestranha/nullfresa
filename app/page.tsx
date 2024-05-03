/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";

const Page: React.FC = () => {
  const [url, setUrl] = useState("");
  const [archivoUrl, setArchivoUrl] = useState<string | null>(null);
  const [descargarUrl, setDescargarUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArchivoUrl(null);
    setDescargarUrl(null);
    setError("");

    if (!url || !url.startsWith("https://www.instagram.com/")) {
      setError("Por favor, ingresa una URL válida de Instagram.");
      return;
    }

    try {
      const response = await fetch("https://cunve-backend.vercel.app/api/imagenfull-instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener la imagen de Instagram full.");
      }

      const data = await response.json();
      setArchivoUrl(data.archivoUrl);
      setDescargarUrl(data.descargarUrl);
    } catch (error: any) {
      setError("Error al obtener la imagen de Instagram: " + error.message);
    }
  };

  return (
    <main className="flex items-center min-h-screen flex-col p-6 gap-2 w-full">
      <div className="flex flex-col items-center gap-2 lg:w-2/6">
        <h1>Descargador de videos e imágenes de Instagram</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full justify-center text-sm gap-4">
          <input
            type="text"
            name="url"
            placeholder="Ingresa la URL de Instagram"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">Obtener datos</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col items-center gap-4 w-full">
          {archivoUrl && (
            <div className="rounded-lg bg-gray-200 p-4 flex flex-col items-center gap-2 w-full h-96">
              <img src={archivoUrl} alt="imagen-descargar" className="object-cover w-full h-full" />
            </div>
          )}
          {descargarUrl && (
            <a className="rounded-lg py-2 px-4 bg-green-400 text-white hover:bg-green-300 transition-colors duration-500" href={descargarUrl} target="_blank">Descargar</a>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
