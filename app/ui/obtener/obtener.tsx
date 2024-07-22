/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState } from "react";
import datoss from "./ejemplo.json"
import { CardIG } from "./components/card_ig";
interface PerfilNoVerificado {
    usuario: string;
    verificado: boolean;
    foto?: string;
    nombre?: string;
    descripcion?: string;
    privado?: boolean;
    expires?: number;
    signature?: string;
}
interface InfoPerfiles {
    no_te_siguen_verificadas: { usuario: string; verificado: boolean }[];
    no_te_siguen_no_verificadas: PerfilNoVerificado[];
    no_sigues_verificadas: { usuario: string; verificado: boolean }[];
    no_sigues_no_verificadas: { usuario: string; verificado: boolean }[];
    cantidad_no_te_siguen: number;
    cantidad_no_te_siguen_verificadas: number;
    cantidad_no_te_siguen_no_verificadas: number;
    cantidad_no_sigues: number;
    cantidad_no_sigues_verificadas: number;
    cantidad_no_sigues_no_verificadas: number;
    cantidad_seguidores: number;
    cantidad_seguidos: number;
}
export default function RevisionIG() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [infoPerfiles, setInfoPerfiles] = useState<InfoPerfiles | undefined>(undefined);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        setInfoPerfiles(undefined);

        if (!username) {
            setError("Por favor, ingresa un usuario de Instagram.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://cunve-backend.vercel.app/api/obtener-informacion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error("????");
            }
            let datos: InfoPerfiles = await response.json();

            if (datos && datos.no_te_siguen_no_verificadas.length > 0) {
                datos.no_te_siguen_no_verificadas = datos.no_te_siguen_no_verificadas.map((item: any) => {
                    if (item && item.foto) {
                        const encodedUrl = encodeURIComponent(item.foto);
                        const signatureUrl = encodeURIComponent(item.signature || '');
                        const expiresUrl = encodeURIComponent(item.expires || '');
                        const newUrl = `https://media.fastdl.app/get?uri=${encodedUrl}&filename=nullfresa&__sig=${signatureUrl}&__expires=${expiresUrl}&referer=https%3A%2F%2Fwww.instagram.com%2F`;
                        item.foto = newUrl;
                    }
                    return item;
                });
                setInfoPerfiles(datos);
            } else {
                setError("La cuenta no existe o esta en privada");
            }
        } catch (error: any) {
            setError("No se encontraron resultados .-.?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col lg:px-6 py-12 justify-center items-center gap-4 w-full">
            <article className="flex flex-col lg:rounded-lg justify-center items-center p-6 gap-2 w-full lg:w-2/3 lg:gap-4" style={{ background: "linear-gradient(to right, #af2b6d, #ff51a8, #af2b6d)" }}>
                <div>
                    <h1 className="text-center font-bold text-2xl lg:text-3xl text-white tracking-wide">Revisión de Seguidores</h1>
                    <p className="text-center text-white max-lg:text-sm">
                        Comprueba si los perfiles que sigues también te siguen de vuelta en
                        <span className="font-bold uppercase"> Instagram</span>
                    </p>
                </div>
                <div className="flex justify-center w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full lg:flex-row justify-center text-sm gap-2 lg:w-2/3">
                        <div className="flex lg:w-[80%] relative">
                            <input
                                type="text"
                                name="username"
                                placeholder="Ingrese tu usuario, Ejemplo: hestranho"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                className="border text-sm w-full border-gray-300 pr-[5.5rem] rounded-md p-2 h-12"
                            />
                            <button
                                className="absolute top-1/2 transform -translate-y-1/2 right-1 flex gap-0.5 bg-gray-100 text-black rounded-md items-center p-2 h-fit border border-gray-400 hover:bg-gray-200 transition-colors duration-300"
                                type="button"
                                onClick={() => setUsername('')}
                            >
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#000000" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                                Borrar
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={`flex text-xs lg:w-[20%] justify-center bg-[#ffc3e1] text-black py-2 items-center px-4 rounded-md hover:bg-[#fb7ebd] transition-colors duration-300 shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
            <div className="flex flex-col max-lg:px-3 items-center gap-5 text-white w-full lg:w-[60rem]">
                {infoPerfiles &&
                    <React.Fragment>
                        <p>En total no te siguen: {infoPerfiles.cantidad_no_te_siguen}</p>
                        <h2 className="flex flex-col text-xl text-center">
                            Cuentas que sigues pero ellos a ti no (se excluye cuentas verificadas)
                            <span className="text-base">Son {infoPerfiles.cantidad_no_te_siguen_no_verificadas} en total</span>
                        </h2>
                        <div className="flex flex-wrap justify-center w-full gap-5">
                            {infoPerfiles.no_te_siguen_no_verificadas.map((perfil, index) => (
                                <CardIG
                                    key={index}
                                    usuario={perfil.usuario}
                                    foto={perfil.foto}
                                    nombre={perfil.nombre}
                                    descripcion={perfil.descripcion}
                                    privado={perfil.privado}
                                />
                            ))}
                        </div>

                        <h2 className="flex flex-col text-xl text-center">
                            Cuentas que no sigues pero ellos a ti si (se excluye cuentas verificadas)
                            <span className="text-base">Son {infoPerfiles.cantidad_no_sigues} en total</span>
                        </h2>
                        <div className="flex flex-wrap justify-center w-full gap-3">
                            {infoPerfiles.no_sigues_no_verificadas.map((perfil, index) => (
                                <div
                                    key={index}
                                    className="py-3 px-4 bg-neutral-900 rounded-md"
                                >
                                    <p>{perfil.usuario}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="flex flex-col text-xl text-center">
                            Cuentas que sigues pero ellos a ti no (se excluye cuentas sin verificar)
                            <span className="text-base">Son {infoPerfiles.cantidad_no_te_siguen_verificadas} en total</span>
                        </h2>
                        <div className="flex flex-wrap justify-center w-full gap-3">
                            {infoPerfiles.no_te_siguen_verificadas.map((perfil, index) => (
                                <div
                                    key={index}
                                    className="py-3 px-4 bg-neutral-900 rounded-md"
                                >
                                    <p>{perfil.usuario}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="flex flex-col text-xl text-center">
                            Cuentas que no sigues pero ellos a ti si (se excluye cuentas sin verificar)
                            <span className="text-base">Son {infoPerfiles.cantidad_no_sigues_verificadas} en total</span>
                        </h2>
                        <div className="flex flex-wrap justify-center w-full gap-3">
                            {infoPerfiles.no_sigues_verificadas.map((perfil, index) => (
                                <div
                                    key={index}
                                    className="py-3 px-4 bg-neutral-900 rounded-md"
                                >
                                    <p>{perfil.usuario}</p>
                                </div>
                            ))}
                        </div>
                    </React.Fragment>
                }
            </div>
        </section>
    );
};

