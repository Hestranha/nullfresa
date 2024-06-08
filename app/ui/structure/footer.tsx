import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="flex w-full text-white justify-center mt-auto p-4 text-sm lg:text-base border-t border-neutral-800 bg-black">
            <Link href="https://hestranho.vercel.app/" target="_blank">
                Creado por hestranho
            </Link>
        </footer>
    );
}
