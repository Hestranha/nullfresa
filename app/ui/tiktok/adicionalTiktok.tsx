/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";
import "./css/copy.css"

export default function AdicionalTiktok() {
    const [descargarTodo, setDescargarTodo] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copy, setCopy] = useState(true);
    const [textareaContent, setTextareaContent] = useState("");
    const [progress, setProgress] = useState(0);
    const [enEjecucion, setEnEjecucion] = useState(false);
    const [enDescarga, setEnDescarga] = useState(false);
    const contenido = `var elementos = document.querySelectorAll('[data-e2e="user-post-item"]');
var hrefs = [];
elementos.forEach(function(elemento) {
    var enlaces = elemento.querySelectorAll('a');
    enlaces.forEach(function(enlace) {
        hrefs.push(enlace.getAttribute('href'));
    });
});
console.log(hrefs);
`

    const handleCopy = () => {
        navigator.clipboard.writeText(contenido);
        setCopy(false);
        setTimeout(() => {
            setCopy(true);
        }, 3000);
    };

    const handleSubmit = async () => {
        setDescargarTodo([]);
        setError("");
        setLoading(true);
        setEnEjecucion(false);
        if (!textareaContent) {
            setError("Por favor, ingresa las urls obtenidas de Tiktok.");
            setLoading(false);
            return;
        }
        const urlsArray = JSON.parse(textareaContent);
        console.log(urlsArray.length);

        try {
            const response = await fetch("https://cunve-backend.vercel.app/api/obtener2-enlaces-tiktok", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(urlsArray),
            });

            if (!response.ok) {
                throw new Error("????");
            }
            const data = await response.json();
            setDescargarTodo(data);
            setEnEjecucion(true);
        } catch (error: any) {
            setError("No se encontraron resultados .-.?");
            console.error("Error al realizar la solicitud:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDescargarTodo = () => {
        if (descargarTodo.length === 0) {
            console.log('No hay enlaces para descargar');
            return;
        }
        setEnDescarga(true);
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < descargarTodo.length) {
                window.open(descargarTodo[index], '_blank', 'noopener,noreferrer');
                index++;
                setProgress((index / descargarTodo.length) * 100);
            } else {
                clearInterval(intervalId);
                setEnDescarga(false);
            }
        }, 10000);
    };

    return (
        <div className="flex flex-col items-center w-full gap-3">
            <article className="flex flex-col lg:rounded-lg justify-center p-6 bg-neutral-950 gap-2 lg:gap-4 w-full lg:w-2/3">
                <div className="mb-4">
                    <h3 className="text-white text-base font-semibold mb-2">Recomendación: Abrir en una nueva ventana</h3>
                    <p className="text-gray-200 text-sm">Para evitar interrupciones en tu navegación, te recomendamos abrir esta página en una nueva ventana del navegador. Esto evitará que se abran y cierren repetidamente nuevas pestañas durante la descarga de los videos.</p>
                </div>
            </article>
            <article className="flex flex-col lg:rounded-lg justify-center p-6 bg-neutral-950 gap-2 lg:gap-4 w-full lg:w-2/3">
                <header>
                    <h1 className="text-center font-bold text-2xl lg:text-3xl text-white tracking-wide">Descarga varios Tiktok&apos;s</h1>
                    <p className="text-center text-gray-100">Todos los videos de un perfil</p>
                </header>
                <section className="flex flex-col justify-center w-full gap-3">
                    <div className="flex w-full max-lg:flex-col gap-3">
                        <div className="relative lg:w-1/2 bg-neutral-900 p-4 pl-6 pr-16 rounded-lg contenido-info">
                            <div className="copy-container">
                                <button className="copy" onClick={handleCopy}>
                                    <span>
                                        {copy ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.35 6.35" height="15" width="15" className="clipboard">
                                                <path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="18" width="18" className="checkmark">
                                                <path fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                                            </svg>
                                        )}
                                    </span>
                                </button>
                            </div>
                            <pre className="text-xs lg:text-sm text-gray-200 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: contenido }} />
                        </div>
                        <div className="lg:w-1/2 p-4 bg-neutral-700 rounded-lg">
                            <textarea
                                className="w-full h-full text-sm resize-none rounded-lg"
                                value={textareaContent}
                                onChange={(e) => setTextareaContent(e.target.value)}
                                placeholder="Ingresa aquí el contenido obtenido por la consola después de ejecutar el código."
                            />
                        </div>
                    </div>
                    <button
                        className={`flex text-xs justify-center bg-neutral-800 text-white py-2 items-center px-4 rounded-md hover:bg-neutral-900 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={loading}
                        style={{ cursor: loading ? "not-allowed" : "pointer" }}
                        onClick={handleSubmit}
                    >
                        {loading ? (
                            <React.Fragment>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}><g><circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#ffffff" strokeWidth="8" r="32" cy="50" cx="50">
                                    <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform" />
                                </circle><g /></g></svg>
                                <p className="text-xs">
                                    BUSCANDO
                                </p>
                            </React.Fragment>
                        ) : (
                            <p className="text-sm tracking-widest">
                                BUSCAR
                            </p>
                        )}
                    </button>
                </section>
                {error &&
                    <div className="flex w-full justify-center">
                        <p className="text-center bg-red-400 lg:w-fit text-sm px-3 py-1 text-white">{error}</p>
                    </div>
                }
            </article>
            {enEjecucion && (
                <article className="flex flex-col lg:rounded-lg justify-center items-center p-6 bg-neutral-950 gap-2 lg:gap-4 w-full lg:w-2/3">
                    <div className="flex justify-center items-center gap-3">
                        <p className="flex text-sm justify-center text-white items-center px-1 rounded-md">
                            Videos encontrados: {descargarTodo.length}
                        </p>
                        <p className="flex text-sm justify-center text-white items-center px-1 rounded-md" >
                            Tiempo estimado: {
                                descargarTodo.length * 10 >= 3600 ?
                                    `${Math.floor(descargarTodo.length * 10 / 3600)} h y ${Math.floor((descargarTodo.length * 10 % 3600) / 60)} min`
                                    : descargarTodo.length * 10 >= 60 ?
                                        `${Math.floor(descargarTodo.length * 10 / 60)} min`
                                        : `${descargarTodo.length * 10} s`
                            }
                        </p>
                        <button
                            className={`flex text-sm justify-center bg-neutral-800 text-white py-2 items-center px-4 rounded-md hover:bg-neutral-900 transition-colors duration-300 ${enDescarga ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            onClick={handleDescargarTodo}
                            disabled={enDescarga}
                        >
                            {enDescarga ? (
                                <React.Fragment>
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}><g><circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#ffffff" strokeWidth="8" r="32" cy="50" cx="50">
                                        <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform" />
                                    </circle><g /></g></svg>
                                    <p className="text-xs">
                                        Descargando
                                    </p>
                                </React.Fragment>
                            ) : (
                                <p className="text-sm tracking-widest">
                                    Descargar todo
                                </p>
                            )}
                        </button>
                    </div>
                    <progress className="w-full" value={progress} max={100} />
                </article>
            )}
            <article className="flex flex-col lg:rounded-lg justify-center p-6 bg-neutral-950 gap-2 lg:gap-4 w-full lg:w-2/3">
                <h2 className="text-white text-xl font-bold uppercase">Guía para descargar varios videos de TikTok</h2>
                <div className="mb-4">
                    <h3 className="text-white text-base font-semibold mb-2">Paso 1: Copiar código en la consola de TikTok</h3>
                    <p className="text-gray-200 text-sm">Abre la página de TikTok y accede al perfil del usuario del que deseas descargar los videos. Luego, abre la consola del navegador (usualmente con F12 o clic derecho &gt; Inspeccionar &gt; pestaña Consola) y pega el código proporcionado en la consola. Este código recuperará todos los enlaces de los videos del perfil.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-white text-base font-semibold mb-2">Paso 2: Cargar todos los videos del perfil</h3>
                    <p className="text-gray-200 text-sm">Es importante cargar todos los videos del perfil para asegurarse de que se obtengan todos los enlaces. De lo contrario, solo se descargarán los videos que estén actualmente visibles en la pantalla.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-white text-base font-semibold mb-2">Paso 3: Copiar el objeto de enlaces</h3>
                    <p className="text-gray-200 text-sm">Una vez que la consola responda con un objeto de enlaces, haz clic derecho sobre él y selecciona &quot;Copiar objeto&quot;. Esto copiará todos los enlaces de los videos al portapapeles.</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-white text-base font-semibold mb-2">Paso 4: Iniciar la descarga</h3>
                    <p className="text-gray-200 text-sm">Haz clic en el botón de buscar, y se mostrará la cantidad de videos encontrados junto con un tiempo de espera mínimo. Luego haz clic en el botón descargar todo y su descarga comenzará automáticamente.</p>
                </div>
            </article>
        </div>
    );
};

