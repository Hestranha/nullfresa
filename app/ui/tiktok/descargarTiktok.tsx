/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";

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

        if (!url || !url.startsWith("https://www.tiktok.com/")) {
            setError("Por favor, ingresa una URL válida de Instagram.");
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
        <div className="flex flex-col items-center w-full pt-6">
            <article className="flex flex-col justify-center p-6 bg-neutral-950 w-full gap-2 lg:gap-4" style={{ background: "linear-gradient(to right, #8a2be2, #ff69b4, #8a2be2)" }}>
                <div>
                    <h1 className="text-center font-bold text-2xl lg:text-3xl text-white tracking-wide">Descarga de Titok</h1>
                    <p className="text-center text-gray-100">Videos, historias y publicaciones</p>
                </div>
                <div className="flex justify-center w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full lg:flex-row justify-center text-sm gap-2 lg:gap-3 lg:w-2/3">
                        <input
                            type="text"
                            name="url"
                            placeholder="Ingresa la URL de Instagram"
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                            className="border text-sm border-gray-300 rounded-md p-2 lg:w-[80%]"
                        />
                        <button
                            type="submit"
                            className={`flex lg:w-[20%] justify-center bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-900 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={loading}
                            style={{ cursor: loading ? "not-allowed" : "pointer" }}
                        >
                            {loading ? (
                                <React.Fragment>
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}><g><circle stroke-linecap="round" fill="none" stroke-dasharray="50.26548245743669 50.26548245743669" stroke="#ffffff" strokeWidth="8" r="32" cy="50" cx="50">
                                        <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform" />
                                    </circle><g /></g></svg>
                                    <p>
                                        BUSCANDO
                                    </p>
                                </React.Fragment>
                            ) : (
                                <p className="font-bold tracking-widest">
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
                    <img
                        src={imagenUrl}
                        alt={`imagen`}
                        className="rounded-md bg-gray-200 object-cover w-full h-full aspect-square"
                    />
                    <a className="flex justify-center rounded-md py-2 px-4 w-full bg-green-500 text-white hover:bg-green-300 transition-colors duration-500" href={videoUrl} target="_blank">Descargar</a>
                </div>
            </div>
        </div>
    );
};

