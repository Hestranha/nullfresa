"use client";
import { useState } from 'react';
import "./css/navbar.css";
import DescargarInstagram from "./descargarInstagram";
import AdicionalInstagram from "./adicionalnstagram";

export function NavInstagram() {
    const [checkSection, setCheckSection] = useState("Descargar");
    const handleRadioChange = (e: any) => {
        setCheckSection(e.target.nextSibling.textContent);
    };

    return (
        <article className="flex flex-col px-6 py-12 justify-center items-center gap-4 w-full">
            <nav className="w-full md:w-2/4 xl:w-2/5 flex justify-center uppercase">
                <div className="radio-inputs select-none gap-2">
                    <label className="radio">
                        <input type="radio" name="radio" checked={checkSection === "Descargar"} onChange={handleRadioChange} />
                        <span className="name">Descargar</span>
                    </label>
                    <label className="radio">
                        <input type="radio" name="radio" checked={checkSection === "Visualizar"} onChange={handleRadioChange} />
                        <span className="name">Visualizar</span>
                    </label>
                </div>
            </nav>
            {
                checkSection === "Descargar" && (
                    <DescargarInstagram />
                )
            }
            {
                checkSection === "Visualizar" && (
                    <AdicionalInstagram />
                )
            }
        </article >
    );
}
