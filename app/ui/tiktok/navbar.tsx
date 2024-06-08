"use client";
import React, { useState } from "react";
import "./css/navbar.css"
import DescargarTitok from "./descargarTiktok";
import AdicionalTiktok from "./adicionalTiktok";

export default function NavbarTiktok() {
    const [checkSection, setCheckSection] = useState("Individual");
    const handleRadioChange = (e: any) => {
        setCheckSection(e.target.nextSibling.textContent);
    };

    return (
        <article className="flex flex-col px-6 py-12 justify-center items-center gap-4 w-full">
            <nav className="w-full md:w-2/4 xl:w-2/5 flex justify-center uppercase">
                <div className="radio-inputst select-none gap-2">
                    <label className="radio">
                        <input type="radio" name="radio" checked={checkSection === "Individual"} onChange={handleRadioChange} />
                        <span className="name">Individual</span>
                    </label>
                    <label className="radio">
                        <input type="radio" name="radio" checked={checkSection === "Multiples"} onChange={handleRadioChange} />
                        <span className="name">Multiples</span>
                    </label>
                </div>
            </nav>
            {
                checkSection === "Individual" && (
                    <DescargarTitok />
                )
            }
            {
                checkSection === "Multiples" && (
                    <AdicionalTiktok />
                )
            }
        </article >
    );
};

