import { FaLinkedin, FaEnvelope } from "react-icons/fa";
export default function ContactoPage() {
  return (
    <main>
      <h1>Contacto</h1>

      <div>
        <h2>Ponte en contacto con nosotros</h2>

        <p>
          Si tienes preguntas, sugerencias o encuentras algún error en la
          calculadora, puedes comunicarte con nosotros.
        </p>

        <p>
          Tu opinión es importante para seguir mejorando la plataforma y ofrecer
          contenido de mayor calidad.
        </p>
      </div>

      <div>
        <h2>Motivos de contacto</h2>

        <ul>
          <li>Reportar errores en los cálculos.</li>

          <li>Sugerir nuevos modelos de teoría de colas.</li>

          <li>Enviar recomendaciones para mejorar el sitio.</li>

          <li>Realizar consultas sobre el funcionamiento de la plataforma.</li>
        </ul>
      </div>

      <div>
        <h2>Información de contacto</h2>

        <a
          href="mailto:brayan.challco.ticona2@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
          <span> brayan.challco.ticona2@gmail.com</span>
        </a>

        <br />
        <br />

        <a
          href="https://www.linkedin.com/in/brayan-challco-ticona-069056418/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
          <span> Brayan Challco Ticona</span>
        </a>
      </div>

      <div>
        <h2>Tiempo de respuesta</h2>

        <p>
          Las consultas serán atendidas lo antes posible según la
          disponibilidad.
        </p>
      </div>

      <div>
        <h2>Gracias por visitarnos</h2>

        <p>
          Agradecemos tu interés en ColaCalcBCT y tu colaboración para seguir
          mejorando esta herramienta educativa.
        </p>
      </div>
    </main>
  );
}
