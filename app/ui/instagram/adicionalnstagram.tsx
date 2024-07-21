/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useEffect, useRef, useState } from "react";

interface UrlSignature {
    expires: number;
    signature: string;
}

interface ImageVersions2 {
    width: number;
    height: number;
    url: string;
    url_signature: UrlSignature;
}

interface VideoVersions {
    type: number;
    width: number;
    height: number;
    url: string;
    url_signature: UrlSignature;
}

interface Archivo {
    image_versions2?: ImageVersions2;
    video_versions?: VideoVersions;
}

interface Contenido {
    url: string;
    url_signature: UrlSignature;
}

interface ImageVersionsDestacada {
    candidates: Contenido[];
}

interface VideoVersionsDestacada {
    type: number;
    width: number;
    height: number;
    url: string;
    url_signature: UrlSignature;
}

interface ArchivosHitoria {
    image_versions2?: ImageVersionsDestacada;
    video_versions?: VideoVersionsDestacada[];
}

// 
interface CoverMedia {
    cropped_image_version: {
        url: string;
        url_signature: UrlSignature;
    };
}
interface Highlight {
    id: string;
    title: string;
    cover_media: CoverMedia;
}


export default function AdicionalInstagram() {
    const [checkSection, setCheckSection] = useState("Historias");
    const [username, setUsername] = useState("");
    const [archivoUrl, setArchivoUrl] = useState<Archivo[]>([]);
    const [errorStory, setErrorStory] = useState("");
    const [errorHighLights, setErrorHighLights] = useState("");
    const [loading, setLoading] = useState(false);
    const inputUsuario = useRef<HTMLInputElement>(null);
    const [archivosHistorias, setArchivosHistorias] = useState<ArchivosHitoria[]>([]);
    const [infoHistoriasDestacadas, setInfoHistoriasDestacadas] = useState<Highlight[]>([]);
    const [loadingHistoriaDestacada, setLoadingHistoriaDestacada] = useState(false);

    const handleHighlights = async () => {

        setLoading(true);
        setInfoHistoriasDestacadas([]);
        setArchivosHistorias([]);
        setErrorHighLights("");

        if (!username) {
            setErrorHighLights("Por favor, ingrese el nombre de usuario");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://cunve-backend.vercel.app/api/info-historias-destacadas-instagram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });
            if (!response.ok) {
                throw new Error('ErrorStory al obtener los datos');
            }
            let data: any[] = await response.json();
            if (data.length > 0) {
                data = data.map(item => {
                    if (item.cover_media.cropped_image_version) {
                        const encodedUrl = encodeURIComponent(item.cover_media.cropped_image_version.url);
                        const signatureUrl = encodeURIComponent(item.cover_media.cropped_image_version.url_signature.signature);
                        const expiresUrl = encodeURIComponent(item.cover_media.cropped_image_version.url_signature.expires);
                        const newUrl = `https://media.fastdl.app/get?uri=${encodedUrl}&filename=nullfresa&__sig=${signatureUrl}&__expires=${expiresUrl}&referer=https%3A%2F%2Fwww.instagram.com%2F`;
                        item.cover_media.cropped_image_version.url = newUrl;
                    }
                    return item;
                });
                setInfoHistoriasDestacadas(data);
            } else {
                setErrorHighLights("No se encontraron historias destacadas");
            }
        } catch (error: any) {
            setErrorHighLights("No se encontraron resultados ._.?");
        } finally {
            setLoading(false);
        }
    }

    const handleFindStory = async () => {
        setArchivoUrl([]);
        setErrorStory("");
        setLoading(true);

        if (!username) {
            setErrorStory("Por favor, ingrese el nombre de usuario");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://cunve-backend.vercel.app/api/historias-instagram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error("????");
            }

            let data: any[] = await response.json();
            if (data.length > 0) {
                data = data.map(item => {
                    if (item.image_versions2) {
                        const encodedUrl = encodeURIComponent(item.image_versions2.url);
                        const signatureUrl = encodeURIComponent(item.image_versions2.url_signature.signature);
                        const expiresUrl = encodeURIComponent(item.image_versions2.url_signature.expires);
                        const newUrl = `https://media.fastdl.app/get?uri=${encodedUrl}&filename=nullfresa&__sig=${signatureUrl}&__expires=${expiresUrl}&referer=https%3A%2F%2Fwww.instagram.com%2F`;
                        item.image_versions2.url = newUrl;
                    }
                    return item;
                });
                setArchivoUrl(data);
            } else {
                setErrorStory("No se encontraron historias");
            }
        } catch (error: any) {
            setErrorStory("No se encontraron resultados .-.?");
        } finally {
            setLoading(false);
        }
    }

    const handleInfo = async (idHighlight: any) => {
        idHighlight = idHighlight.split(':')[1]
        setArchivosHistorias([]);
        setLoadingHistoriaDestacada(true)
        try {
            const response = await fetch("https://cunve-backend.vercel.app/api/unica-historia-destacada-instagram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idhighlight: idHighlight }),
            });

            if (!response.ok) {
                throw new Error("????");
            }

            let data: any[] = await response.json();
            if (data.length > 0) {
                data = data.map(item => {
                    if (item.image_versions2) {
                        const encodedUrl = encodeURIComponent(item.image_versions2.candidates[0].url);
                        const signatureUrl = encodeURIComponent(item.image_versions2.candidates[0].url_signature.signature);
                        const expiresUrl = encodeURIComponent(item.image_versions2.candidates[0].url_signature.expires);
                        const newUrl = `https://media.fastdl.app/get?uri=${encodedUrl}&filename=nullfresa&__sig=${signatureUrl}&__expires=${expiresUrl}&referer=https%3A%2F%2Fwww.instagram.com%2F`;
                        item.image_versions2.candidates[0].url = newUrl;
                    }
                    return item;
                });
                setArchivosHistorias(data);
            }
        } catch (error: any) {
            console.log("No se encontraron resultados .-.?");
        } finally {
            setLoadingHistoriaDestacada(false);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (checkSection !== "Historias") {
            handleHighlights();
        } else {
            handleFindStory();
        }
    };

    const handleDownload = (url: string, filename: string) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(errorStory => console.error('ErrorStory al descargar el archivo:', errorStory));
    };

    return (
        <div className="flex flex-col items-center w-full">
            <article className="flex flex-col lg:rounded-t-lg justify-center items-center p-6 gap-2 w-full lg:w-2/3 lg:gap-4" style={{ background: "linear-gradient(to right, #8a2be2, #ff69b4, #8a2be2)" }}>
                <div>
                    <h1 className="text-center font-bold text-2xl lg:text-3xl text-white tracking-wide">Visualizar de Instagram</h1>
                    <p className="text-center text-gray-100">Historias de manera anónima</p>
                </div>
                <div className="flex justify-center w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full lg:flex-row justify-center text-sm gap-2 lg:w-2/3">
                        <div className="flex lg:w-[80%] relative">
                            <input
                                type="text"
                                ref={inputUsuario}
                                name="username"
                                placeholder="Ingrese el usuario, Ejemplo: oliviarodrigo"
                                className="border text-sm w-full border-gray-300 pr-[5.5rem] rounded-md p-2 h-12"
                            />
                            <button
                                className="absolute top-1/2 transform -translate-y-1/2 right-1 flex gap-0.5 bg-gray-100 text-black rounded-md items-center p-2 h-fit border border-gray-400 hover:bg-gray-200 transition-colors duration-300"
                                type="button"
                                onClick={() => (inputUsuario as any).current.value = ""}
                            >
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#000000" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                                Borrar
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={`flex text-xs lg:w-[20%] justify-center bg-purple-800 text-white py-2 items-center px-4 rounded-md hover:bg-purple-900 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={loading}
                            style={{ cursor: loading ? "not-allowed" : "pointer" }}
                            onClick={() => setUsername((inputUsuario as any).current.value)}
                        >
                            {loading ? (
                                <svg className="w-5 h-5 lg:w-7 lg:h-7" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}><g><circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#ffffff" strokeWidth="8" r="32" cy="50" cx="50">
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
            </article>

            <section className="flex flex-col justify-center items-center w-full">
                <div className="flex bg-purple-800 lg:rounded-b-lg text-white w-full lg:w-2/3 justify-center items-center">
                    <button
                        className={`${checkSection == "Historias" && "bg-[#ff2395]"} h-full py-3 px-3 hover:bg-[#ff2395] transition-colors duration-300 ease-in-out`}
                        type="button"
                        onClick={() => setCheckSection("Historias")}
                    >
                        Historias
                    </button>
                    <button
                        type="button"
                        className={`${checkSection == "Historias Destacadas" && "bg-[#ff2395]"} h-full py-3 px-3 hover:bg-[#ff2395] transition-colors duration-300 ease-in-out`}
                        onClick={() => setCheckSection("Historias Destacadas")}
                    >
                        Historias Destacadas
                    </button>
                </div>
                {
                    checkSection === "Historias" && (
                        <React.Fragment>
                            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center p-6 gap-4 w-full lg:w-2/3">
                                {archivoUrl.map((archivo, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2 w-full">
                                        {archivo.image_versions2 && (
                                            <img
                                                src={archivo.image_versions2.url}
                                                alt={`imagen-${index}`}
                                                draggable={false}
                                                className="rounded-md bg-gray-200 w-full h-full"
                                            />
                                        )}
                                        {archivo.video_versions && (
                                            <video
                                                controls
                                                className="rounded-md bg-gray-200 w-full h-full"
                                            >
                                                <source src={archivo.video_versions.url} type="video/mp4" />
                                                Tu navegador no soporta video HTML5.
                                            </video>
                                        )}
                                        <div className="flex max-w-lg flex-col w-full gap-2">
                                            <button
                                                key={`download-${index}`}
                                                className="flex justify-center rounded-md py-2 px-4 w-full bg-green-500 text-white hover:bg-green-300 transition-colors duration-500"
                                                onClick={() => handleDownload(
                                                    archivo.video_versions
                                                        ? archivo.video_versions.url
                                                        : archivo.image_versions2
                                                            ? archivo.image_versions2.url
                                                            : '',
                                                    `nullfresa_ig_${index + 1}.${archivo.video_versions ? 'mp4' : 'jpg'
                                                    }`
                                                )}
                                            >
                                                Descargar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errorStory &&
                                <div className="flex w-full justify-center">
                                    <p className="text-center bg-red-400 lg:w-fit text-sm px-3 py-1 text-white">{errorStory}</p>
                                </div>
                            }
                        </React.Fragment>
                    )
                }
                {
                    checkSection === "Historias Destacadas" && (
                        <React.Fragment>
                            <div className="flex flex-wrap justify-start items-center p-6 gap-4 w-full lg:w-2/3">
                                {infoHistoriasDestacadas.map((historiaDestacada, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <img
                                            src={historiaDestacada.cover_media.cropped_image_version.url}
                                            alt={historiaDestacada.title}
                                            draggable={false}
                                            onClick={() => handleInfo(historiaDestacada.id)}
                                            className="w-24 h-24 rounded-full border border-white cursor-pointer hover:opacity-50 transition-opacity duration-300 ease-in-out"
                                        />
                                        <p className="text-white">{historiaDestacada.title}</p>
                                    </div>
                                ))}
                            </div>
                            {loadingHistoriaDestacada && (
                                <svg className="w-24 h-24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{ shapeRendering: "auto", display: "block", background: "transparent" }}><g><circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#ffffff" strokeWidth="8" r="32" cy="50" cx="50">
                                    <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform" />
                                </circle><g /></g></svg>
                            )}
                            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center p-6 pt-0 gap-4 w-full lg:w-2/3">
                                {archivosHistorias.map((archivo, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2 w-full">
                                        {archivo.video_versions ? (
                                            <video
                                                controls
                                                className="rounded-md bg-gray-200 w-full h-full"
                                            >
                                                <source src={archivo.video_versions[0].url} type="video/mp4" />
                                                Tu navegador no soporta video HTML5.
                                            </video>
                                        ) : (
                                            <React.Fragment>
                                                {archivo.image_versions2 && (
                                                    <img
                                                        src={archivo.image_versions2.candidates[0].url}
                                                        alt={`imagen-${index}`}
                                                        draggable={false}
                                                        className="rounded-md bg-gray-200 w-full h-full"
                                                    />
                                                )}
                                            </React.Fragment>
                                        )}

                                        <div className="flex max-w-lg flex-col w-full gap-2">
                                            <button
                                                key={`download-${index}`}
                                                className="flex justify-center rounded-md py-2 px-4 w-full bg-green-500 text-white hover:bg-green-300 transition-colors duration-500"
                                                onClick={() => handleDownload(
                                                    archivo.video_versions
                                                        ? archivo.video_versions[0].url
                                                        : archivo.image_versions2
                                                            ? archivo.image_versions2.candidates[0].url
                                                            : '',
                                                    `nullfresa_ig_destacada_${index + 1}.${archivo.video_versions ? 'mp4' : 'jpg'
                                                    }`
                                                )}
                                            >
                                                Descargar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errorHighLights &&
                                <div className="flex w-full justify-center">
                                    <p className="text-center bg-red-400 lg:w-fit text-sm px-3 py-1 text-white">{errorHighLights}</p>
                                </div>
                            }
                        </React.Fragment>
                    )
                }
            </section>
        </div>
    );
};

