import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1>ColaCalcBCT</h1>

        <h2>Calculadora de Teoría de Colas</h2>

        <p>
          Calcula fácilmente los modelos M/M/1, M/M/S, M/M/1/K, M/M/S/K, M/M/1/C
          y M/M/S/C mediante una plataforma gratuita diseñada para estudiantes,
          docentes e investigadores.
        </p>

        <Link href="/teoria-colas">Comenzar</Link>
      </div>

      <hr />

      <div>
        <h2>¿Qué es la teoría de colas?</h2>

        <p>
          La teoría de colas es una rama de la investigación operativa que
          estudia el comportamiento de los sistemas donde los clientes esperan
          para recibir un servicio.
        </p>

        <p>
          Su objetivo es analizar tiempos de espera, utilización de servidores y
          desempeño del sistema para optimizar recursos y mejorar la atención.
        </p>
      </div>

      <hr />

      <div>
        <h2>Modelos disponibles</h2>

        <ul>
          <li>
            <Link href="/teoria-colas/mm1">Modelo M/M/1</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mms">Modelo M/M/S</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmik">Modelo M/M/1/K</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmsk">Modelo M/M/S/K</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmic">Modelo M/M/1/C</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmsc">Modelo M/M/S/C</Link>
          </li>
        </ul>
      </div>

      <hr />

      <div>
        <h2>¿Por qué utilizar ColaCalcBCT?</h2>

        <ul>
          <li>Calculadoras gratuitas.</li>

          <li>Resultados instantáneos.</li>

          <li>Fórmulas matemáticas detalladas.</li>

          <li>Ejemplos resueltos paso a paso.</li>

          <li>Explicación teórica de cada modelo.</li>

          <li>Interfaz sencilla y fácil de utilizar.</li>
        </ul>
      </div>

      <hr />

      <div>
        <h2>Preguntas frecuentes</h2>

        <h3>¿La calculadora es gratuita?</h3>

        <p>Sí. Todas las herramientas de ColaCalcBCT son de acceso libre.</p>

        <h3>¿Los resultados son exactos?</h3>

        <p>
          Los cálculos se realizan utilizando las fórmulas clásicas de la teoría
          de colas.
        </p>

        <h3>¿Está dirigida solo a estudiantes?</h3>

        <p>
          No. También puede utilizarse en investigación, ingeniería y análisis
          de sistemas.
        </p>
      </div>
    </main>
  );
}
