import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Cola<span>CalcBCT</span></h2>
          <p>Calculadora gratuita de teoría de colas.</p>
        </div>

        <ul className="footer-links">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/contacto">Contacto</Link>
          </li>
          <li>
            <Link href="/privacidad">Privacidad</Link>
          </li>
          <li>
            <Link href="/acerca-de">Acerca de</Link>
          </li>
        </ul>

        <span className="footer-copyright">© 2026 ColaCalcBCT</span>
      </div>
    </footer>
  );
}