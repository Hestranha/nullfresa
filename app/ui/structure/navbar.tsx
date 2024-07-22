"use client";
import Link from "next/link";
import "./css/navbar.css"
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return (
        <nav className="fixed w-full z-10 nav-principal">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 w-full lg:w-4/5 xl:w-4/6">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center whitespace-nowrap text-2xl md:text-2xl text-white tracking-wide">
                        null<span className="text-red-600">fresa</span>
                    </span>
                </Link>
                <button
                    onClick={toggleMenu}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    aria-label="boton-de-abrir-menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 text-gray-400 hover:bg-black focus:bg-opacity-50 md:hidden"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen ? "true" : "false"}
                >
                    <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={`${isMenuOpen ? "block" : "hidden"
                        } w-full md:block md:w-auto`}
                    id="navbar-default"
                >
                    <ul className="mt-4 flex flex-col rounded-lg border bg-neutral-950 bg-opacity-60 p-1 font-medium rtl:space-x-reverse border-neutral-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:bg-transparent text-sm">
                        <li className='flex nav-effect md:p-0'>
                            <Link href="/obtener" className="w-full px-3 py-2">
                                <span className={`${pathname === '/obtener' ? 'nav-select' : ''}`}>
                                    Revisión IG
                                </span>
                            </Link>
                        </li>/
                        <li className='flex nav-effect md:p-0'>
                            <Link href="/youtube" className="w-full px-3 py-2">
                                <span className={`${pathname === '/youtube' ? 'nav-select' : ''}`}>
                                    Youtube
                                </span>
                            </Link>
                        </li>
                        <li className='flex nav-effect md:p-0'>
                            <Link href="/instagram" className="w-full px-3 py-2">
                                <span className={`${pathname === '/instagram' ? 'nav-select' : ''}`}>
                                    Instagram
                                </span>
                            </Link>
                        </li>
                        <li className='flex nav-effect md:p-0'>
                            <Link href="/tiktok" className="w-full px-3 py-2">
                                <span className={`${pathname.startsWith('/tiktok') ? 'nav-select' : ''}`}>
                                    TikTok
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
