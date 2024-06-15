/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";

export default function DescargarYoutube() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [videoOpciones, setVideoOpciones] = useState<{ urlGeneral: string, quality: string, size: string, url: string }[]>([]);
    const [audioOpciones, setAudioOpciones] = useState<{ quality: string, size: string, url: string }[]>([]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTitulo("");
        setAutor("");
        setVideoOpciones([]);
        setAudioOpciones([]);
        setError("");
        setLoading(true);

        if (!url) {
            setError("Por favor, ingresa una URL válida de Youtube.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://cunve-backend.vercel.app/api/descargador-youtube", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error("????");
            }

            const data = await response.json();
            setTitulo(data.title);
            setAutor(data.author);
            const primerElemento = data.videoOptions[0];
            primerElemento.url = primerElemento.url.replace('descargar-video-mp4', 'descargar-videoaudio');
            setVideoOpciones(data.videoOptions);
            setAudioOpciones(data.audioOptions);
        } catch (error: any) {
            setError("No se encontraron resultados .-.?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col lg:px-6 py-12 justify-center items-center gap-4 w-full">
            <article className="flex flex-col lg:rounded-lg justify-center items-center p-6 gap-2 w-full lg:w-2/3 lg:gap-4" style={{ background: "linear-gradient(to right, #000000, #ff0000, #000000)" }}>
                <div>
                    <h1 className="text-center font-bold text-2xl lg:text-3xl text-white tracking-wide">Descargar de Youtube</h1>
                    <p className="text-center text-gray-100">Videos y música</p>
                </div>
                <div className="flex justify-center w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full lg:flex-row justify-center text-sm gap-2 lg:w-2/3">
                        <div className="flex lg:w-[80%] relative">
                            <input
                                type="text"
                                name="url"
                                placeholder="Ingresa la URL de Youtube"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                                className="border text-sm w-full border-gray-300 pr-[5.5rem] rounded-md p-2 h-12"
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
                            className={`flex text-xs lg:w-[20%] justify-center bg-red-600 text-white py-2 items-center px-4 rounded-md hover:bg-red-800 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={loading}
                            style={{ cursor: loading ? "not-allowed" : "pointer" }}
                        >
                            {loading ? (
                                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}><g><circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#ffffff" strokeWidth="8" r="32" cy="50" cx="50">
                                    <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform" />
                                </circle><g /></g></svg>
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
            {titulo &&
                <article className="flex flex-col p-6 gap-4 w-full lg:w-2/3">
                    <header>
                        <h2 className="text-white font-bold text-xl">{titulo}</h2>
                        <p className="text-white font-bold text-sm">{autor}</p>
                    </header>
                    <section className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
                        {videoOpciones.length > 0 && (
                            <video controls>
                                <source src={videoOpciones[0].urlGeneral} type="video/mp4" />
                            </video>
                        )}
                        <div className="flex flex-col gap-2 text-white">
                            VIDEO
                            {videoOpciones.length > 0 && (
                                <ul className="grid grid-cols-3 text-center items-center">
                                    <li>{videoOpciones[0].quality}</li>
                                    <li>{videoOpciones[0].size}</li>
                                    <li>
                                        <a
                                            className="flex justify-center rounded-md py-2 px-4 w-full bg-green-500 text-white hover:bg-green-300 transition-colors duration-500"
                                            href={videoOpciones[0].url}
                                            download={`video.mp4`}>
                                            Descargar
                                        </a>
                                    </li>
                                </ul>
                            )}
                            AUDIO
                            {audioOpciones.map((opcion, index) => (
                                <ul className="grid grid-cols-3 text-center items-center" key={index}>
                                    <li>{opcion.quality}</li>
                                    <li>{opcion.size}</li>
                                    <li>
                                        <a
                                            className="flex justify-center rounded-md py-2 px-4 w-full bg-green-500 text-white hover:bg-green-300 transition-colors duration-500"
                                            href={opcion.url}
                                            download={`audio_${index + 1}.mp3`}>
                                            Descargar
                                        </a>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </section>
                </article>
            }
        </section>
    );
};

