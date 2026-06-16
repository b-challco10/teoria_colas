import Link from "next/link";

export default function TeoriaColas() {
  return (
    <main>
      <h1>Teoría de Colas</h1>

      <div>
        <h2>¿Qué es la teoría de colas?</h2>

        <p>
          La teoría de colas es una disciplina matemática que estudia los
          sistemas en los que los clientes esperan para recibir un servicio.
        </p>

        <p>
          Mediante modelos probabilísticos es posible estimar tiempos de espera,
          longitud de las colas y utilización de los servidores para optimizar
          el funcionamiento del sistema.
        </p>
      </div>

      <hr />

      <div>
        <h2>Elementos de un sistema de colas</h2>

        <ul>
          <li>Clientes.</li>

          <li>Proceso de llegada.</li>

          <li>Cola de espera.</li>

          <li>Servidor o servidores.</li>

          <li>Disciplina de atención.</li>

          <li>Capacidad del sistema.</li>

          <li>Población de clientes.</li>
        </ul>
      </div>

      <hr />

      <div>
        <h2>Objetivos</h2>

        <ul>
          <li>Reducir tiempos de espera.</li>

          <li>Mejorar la atención.</li>

          <li>Optimizar recursos.</li>

          <li>Incrementar la eficiencia del sistema.</li>

          <li>Reducir costos operativos.</li>
        </ul>
      </div>

      <hr />

      <div>
        <h2>Principales indicadores</h2>

        <ul>
          <li>λ : Tasa de llegada.</li>

          <li>μ : Tasa de servicio.</li>

          <li>ρ : Factor de utilización.</li>

          <li>L : Clientes promedio en el sistema.</li>

          <li>Lq : Clientes promedio en cola.</li>

          <li>W : Tiempo promedio en el sistema.</li>

          <li>Wq : Tiempo promedio en cola.</li>
        </ul>
      </div>

      <hr />

      <div>
        <h2>Modelos disponibles</h2>

        <ul>
          <li>
            <Link href="/teoria-colas/mm1">M/M/1</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mms">M/M/S</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmik">M/M/1/K</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmsk">M/M/S/K</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmic">M/M/1/C</Link>
          </li>

          <li>
            <Link href="/teoria-colas/mmsc">M/M/S/C</Link>
          </li>
        </ul>
      </div>

      <hr />

      <div>
        <h2>Conclusión</h2>

        <p>
          La teoría de colas es una herramienta fundamental para el análisis y
          diseño de sistemas de atención, permitiendo tomar decisiones que
          mejoren la eficiencia y reduzcan los tiempos de espera.
        </p>
      </div>
    </main>
  );
}
