'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigate() {
    const pathname = usePathname();
    console.log("pathname", pathname);
    return (
        <nav className="bg-transparent">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-300 rounded-lg md:hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:bg-transparent">
                        <li>
                            <Link href="/" className={pathname === "/" ? "block py-2 px-3 text-white md:text-white md:p-0" : "block py-2 px-3 text-slate-300 md:text-slate-300 md:p-0 hover:text-white"} aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/home" className={pathname === "/home" ? "block py-2 px-3 text-white md:text-white md:p-0" : "block py-2 px-3 text-slate-300 md:text-slate-300 md:p-0 hover:text-white"}>About</Link>
                        </li>
                        <li>
                            <Link href="/products/1" className={pathname === "/products/1" ? "block py-2 px-3 text-white md:text-white md:p-0" : "block py-2 px-3 text-slate-300 md:text-slate-300 md:p-0 hover:text-white"}>Products</Link>
                        </li>
                        <li>
                            <Link href="/users-client" className={pathname === "/users-client" ? "block py-2 px-3 text-white md:text-white md:p-0" : "block py-2 px-3 text-slate-300 md:text-slate-300 md:p-0 hover:text-white"}>Users-Client</Link>
                        </li>
                        <li>
                            <Link href="/users-server" className={pathname === "/users-server" ? "block py-2 px-3 text-white md:text-white md:p-0" : "block py-2 px-3 text-slate-300 md:text-slate-300 md:p-0 hover:text-white"}>Users-Server</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}