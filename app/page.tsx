/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";

const Page: React.FC = () => {
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);

  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setImageUrl(null);
    setVistaPrevia(null);

    setError("");

    if (!url || !url.startsWith("https://www.instagram.com/p/")) {
      setError("Por favor, ingresa una URL válida de Instagram.");
      return;
    }

    try {
      const response = await fetch("https://cunve-backend.vercel.app/api/imagen-instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        const data = await response.json();
        setVistaPrevia(data.vistaPreviaImage);
      } else {
        setError("Error al obtener la imagen de Instagram previa.");
      }
    } catch (error: any) {
      setError("Error al obtener la imagen de Instagram: " + error.message);
    }

    try {
      const response = await fetch("https://cunve-backend.vercel.app/api/imagenfull-instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } else {
        setError("Error al obtener la imagen de Instagram full.");
      }
    } catch (error: any) {
      setError("Error al obtener la imagen de Instagram: " + error.message);
    }
  };

  const handleDownload = async () => {
    if (!vistaPrevia) return;

    try {
      const response = await fetch(vistaPrevia);
      if (!response.ok) throw new Error("No se pudo descargar la imagen.");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "imagen_instagram.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error: any) {
      setError("Error al descargar la imagen: " + error.message);
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">Obtener Imagen</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {imageUrl && (
          <a href={imageUrl} target="_blank">asdsad</a>
        )}
        {vistaPrevia && (
          <div className="flex flex-col items-center gap-4">
            <p>Contenido de imagen:</p>
            <div className="flex flex-col items-center gap-2">
              <button className="rounded-lg py-2 px-4 bg-green-400 text-white hover:bg-green-300 transition-colors duration-500" onClick={handleDownload}>Descargar</button>
              <img src={vistaPrevia} alt="imagen-descargar" className="w-3/4 h-auto" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
