"use client";

import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          Cola<span>CalcBCT</span>
        </Link>

        {/* 👇 Botón hamburguesa */}
        <button 
          className="hamburger"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${menuAbierto ? 'open' : ''}`}>
          <li>
            <Link href="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
          </li>

          <li>
            <Link href="/teoria-colas" onClick={() => setMenuAbierto(false)}>
              Teoría de Colas
            </Link>
          </li>

          <li className="dropdown">
            <button
              type="button"
              className="dropdown-button"
              onClick={() => setAbierto(!abierto)}
            >
              Modelos
              <FaChevronDown 
                className={`chevron-icon ${abierto ? 'rotate-180' : ''}`}
              />
            </button>

            {abierto && (
              <ul className="dropdown-menu">
                <li onClick={() => { setAbierto(false); setMenuAbierto(false); }}>
                  <Link href="/teoria-colas/mm1">M/M/1</Link>
                </li>
                <li onClick={() => { setAbierto(false); setMenuAbierto(false); }}>
                  <Link href="/teoria-colas/mms">M/M/S</Link>
                </li>
                <li onClick={() => { setAbierto(false); setMenuAbierto(false); }}>
                  <Link href="/teoria-colas/mmik">M/M/1/K</Link>
                </li>
                <li onClick={() => { setAbierto(false); setMenuAbierto(false); }}>
                  <Link href="/teoria-colas/mmsk">M/M/S/K</Link>
                </li>
                <li onClick={() => { setAbierto(false); setMenuAbierto(false); }}>
                  <Link href="/teoria-colas/mmic">M/M/1/C</Link>
                </li>
                <li onClick={() => { setAbierto(false); setMenuAbierto(false); }}>
                  <Link href="/teoria-colas/mmsc">M/M/S/C</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/contacto" onClick={() => setMenuAbierto(false)}>
              Contacto
            </Link>
          </li>

          <li>
            <Link href="/acerca-de" onClick={() => setMenuAbierto(false)}>
              Acerca de
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}