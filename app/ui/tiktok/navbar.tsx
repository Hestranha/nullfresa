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
        <React.Fragment>
            <nav className="flex justify-center">
                <div className="radio-inputs select-none">
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
        </React.Fragment>
    );
};

