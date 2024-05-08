/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";
import NavbarTiktok from "./navbar";

export default function DescargarTitok() {
    const [url, setUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [imagenUrl, setImagenUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setVideoUrl("");
        setImagenUrl("");
        setError("");
        setLoading(true);

        if (!url || !url.startsWith("https://www.tiktok.com/" || !url.startsWith("https://vm.tiktok.com/"))) {
            setError("Por favor, ingresa una URL válida de Tiktok.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://cunve-backend.vercel.app/api/video-tiktok", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error("????");
            }

            const data = await response.json();
            setVideoUrl(data.videoUrlTiktok);
            setImagenUrl(data.imageSrcTiktok);

        } catch (error: any) {
            setError("No se encontraron resultados .-.?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <article className="flex flex-col lg:rounded-lg justify-center p-6 bg-neutral-950 gap-2 lg:gap-4 w-full lg:w-2/3">
                <div>
                    <h1 className="text-center font-bold text-2xl lg:text-3xl text-white tracking-wide">Descarga un Tiktok</h1>
                    <p className="text-center text-gray-100">Videos sin marca de agua</p>
                </div>
                <div className="flex justify-center w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full lg:flex-row justify-center text-sm gap-2 lg:w-2/3">
                        <div className="flex lg:w-[80%] relative">
                            <input
                                type="text"
                                name="url"
                                placeholder="Ingresa la URL de Tiktok"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                                className="border text-sm w-full border-gray-300 rounded-md p-2 pr-[5.5rem] h-12"
                            />
                            <button
                                className="absolute top-1/2 transform -translate-y-1/2 right-1 flex gap-0.5 bg-gray-100 text-black rounded-md items-center p-2 h-fit border border-gray-400 hover:bg-gray-200 transition-colors duration-300"
                                type="button"
                                onClick={() => setUrl('')}
                            >
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#000000" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                                Borrar
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={`flex text-xs lg:w-[20%] justify-center bg-neutral-800 text-white py-2 items-center px-4 rounded-md hover:bg-neutral-900 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={loading}
                            style={{ cursor: loading ? "not-allowed" : "pointer" }}
                        >
                            {loading ? (
                                <React.Fragment>
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}><g><circle stroke-linecap="round" fill="none" stroke-dasharray="50.26548245743669 50.26548245743669" stroke="#ffffff" strokeWidth="8" r="32" cy="50" cx="50">
                                        <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform" />
                                    </circle><g /></g></svg>
                                    <p className="text-xs">
                                        BUSCANDO
                                    </p>
                                </React.Fragment>
                            ) : (
                                <p className="font-bold text-sm tracking-widest">
                                    BUSCAR
                                </p>
                            )}
                        </button>
                    </form>
                </div>
                {error &&
                    <div className="flex w-full justify-center">
                        <p className="text-center bg-red-400 lg:w-fit text-sm px-3 py-1 text-white">{error}</p>
                    </div>
                }
            </article>
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center p-6 gap-4 w-full lg:w-2/3">
                <div className="flex flex-col items-center gap-2 w-full">
                    {imagenUrl && (
                        <img
                            src={imagenUrl}
                            alt={`imagen`}
                            className="rounded-md select-none bg-gray-200 object-cover w-full h-full aspect-square"
                        />
                    )}
                    {videoUrl && (
                        <a className="flex justify-center rounded-md py-2 px-4 w-full bg-green-500 text-white hover:bg-green-300 transition-colors duration-500" href={videoUrl} target="_blank">Descargar</a>
                    )}
                </div>
            </div>
        </div>
    );
};

