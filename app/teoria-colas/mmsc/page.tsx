"use client";
import SeccionEjemplo from "@/components/colas/SeccionEjemplo";
import SeccionFormulas from "@/components/colas/SeccionFormulas";
import { useState } from "react";
import { calcularMMSC, ResultadoMMSC } from "@/lib/modelos-colas/mmsc";

export default function MMSCPage() {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [s, setS] = useState("");
  const [m, setM] = useState("");

  const [resultado, setResultado] = useState<ResultadoMMSC | null>(null);

  const [error, setError] = useState("");

  const calcular = () => {
    try {
      setError("");

      const res = calcularMMSC(
        Number(lambda),
        Number(mu),
        Number(s),
        Number(m),
      );

      setResultado(res);
    } catch (err) {
      setResultado(null);

      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h1>Modelo M/M/S/C</h1>
      <hr />
      {/* Introducción */}

      <div>
        <h2>¿Qué es el modelo M/M/S/C?</h2>

        <p>
          El modelo M/M/S/C es una extensión del modelo M/M/S que considera una
          población finita de clientes y múltiples servidores trabajando en
          paralelo. Las llegadas siguen un proceso de Poisson, los tiempos de
          servicio tienen una distribución exponencial y el número de clientes
          potenciales está limitado a C unidades.
        </p>

        <p>
          Debido a que la población es finita, la tasa efectiva de llegada varía
          según la cantidad de clientes que ya se encuentran dentro del sistema.
          Esto permite representar de forma más realista situaciones donde
          existe un número limitado de usuarios o equipos que requieren atención
          por parte de varios servidores.
        </p>
      </div>

      {/* Características */}

      <div>
        <h2>Características</h2>

        <ul>
          <li>Llegadas según un proceso de Poisson.</li>

          <li>Tiempos de servicio con distribución exponencial.</li>

          <li>Múltiples servidores trabajando simultáneamente.</li>

          <li>Población finita de C clientes.</li>

          <li>
            La tasa de llegada depende del número de clientes disponibles.
          </li>

          <li>
            Los clientes esperan en una cola cuando todos los servidores están
            ocupados.
          </li>

          <li>
            Disciplina de atención FIFO (primero en entrar, primero en salir).
          </li>
        </ul>
      </div>

      {/* Aplicaciones */}

      <div>
        <h2>¿Cuándo se utiliza?</h2>

        <ul>
          <li>
            Talleres de mantenimiento con varias estaciones de reparación.
          </li>

          <li>Empresas con un número fijo de máquinas y varios técnicos.</li>

          <li>
            Laboratorios con varios equipos atendiendo una cantidad limitada de
            muestras.
          </li>

          <li>
            Sistemas informáticos con varios servidores y un número fijo de
            terminales.
          </li>

          <li>
            Procesos industriales con varios operarios atendiendo un conjunto
            limitado de equipos.
          </li>

          <li>
            Centros de soporte técnico con varios especialistas y una cantidad
            fija de usuarios.
          </li>
        </ul>
      </div>
      <div>
        <h2>Calculadora</h2>
        <label>λ (Tasa de llegada)</label>

        <br />

        <input
          type="number"
          step="any"
          value={lambda}
          onChange={(e) => setLambda(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>μ (Tasa de servicio)</label>

        <br />

        <input
          type="number"
          step="any"
          value={mu}
          onChange={(e) => setMu(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>S (Número de servidores)</label>

        <br />

        <input type="number" value={s} onChange={(e) => setS(e.target.value)} />
      </div>

      <br />

      <div>
        <label>m (Población finita)</label>

        <br />

        <input type="number" value={m} onChange={(e) => setM(e.target.value)} />
      </div>

      <br />

      <button onClick={calcular}>Calcular</button>

      <br />
      <br />

      {error && <p>{error}</p>}

      {resultado && (
        <div>
          <h2>Resultados</h2>

          <p>P₀ ={resultado.p0.toFixed(4)}</p>

          <p>L ={resultado.l.toFixed(4)}</p>

          <p>Lq ={resultado.lq.toFixed(4)}</p>

          <p>Ld ={resultado.ld.toFixed(4)}</p>

          <p>Ls ={resultado.ls.toFixed(4)}</p>

          <p>W ={resultado.w.toFixed(4)}</p>

          <p>Wq ={resultado.wq.toFixed(4)}</p>

          <p>Ws ={resultado.ws.toFixed(4)}</p>
        </div>
      )}
      <SeccionFormulas
        titulo="Fórmulas del Modelo M/M/S/C"
        formulas={[
          {
            titulo: "Probabilidad de que el sistema esté vacío",
            expresion:
              "P_0=\\frac{1}{\\sum_{n=0}^{s-1}\\frac{m!}{(m-n)!n!}\\left(\\frac{\\lambda}{\\mu}\\right)^n+\\sum_{n=s}^{m}\\frac{m!}{(m-n)!s!s^{n-s}}\\left(\\frac{\\lambda}{\\mu}\\right)^n}",
            descripcion:
              "Probabilidad de que no exista ningún cliente en el sistema.",
          },
          {
            titulo:
              "Probabilidad de tener n unidades en el sistema (0 ≤ n < s)",
            expresion:
              "P_n=\\frac{m!}{(m-n)!n!}\\left(\\frac{\\lambda}{\\mu}\\right)^nP_0",
            descripcion:
              "Probabilidad de tener n clientes cuando existen servidores disponibles.",
          },
          {
            titulo:
              "Probabilidad de tener n unidades en el sistema (s ≤ n ≤ m)",
            expresion:
              "P_n=\\frac{m!}{(m-n)!s!s^{n-s}}\\left(\\frac{\\lambda}{\\mu}\\right)^nP_0",
            descripcion:
              "Probabilidad de tener n clientes cuando todos los servidores están ocupados.",
          },
          {
            titulo: "Número promedio de unidades en el sistema",
            expresion:
              "L=\\sum_{n=0}^{s-1}n\\frac{m!}{(m-n)!n!}\\left(\\frac{\\lambda}{\\mu}\\right)^nP_0+\\sum_{n=s}^{m}n\\frac{m!}{(m-n)!s!s^{n-s}}\\left(\\frac{\\lambda}{\\mu}\\right)^nP_0",
            descripcion: "Número promedio de clientes presentes en el sistema.",
          },
          {
            titulo: "Número promedio de clientes en la cola",
            expresion: "L_q=L-(s-L_D)",
            descripcion: "Número promedio de clientes esperando atención.",
          },
          {
            titulo: "Número promedio de estaciones desocupadas",
            expresion:
              "L_D=\\sum_{n=0}^{s-1}(s-n)\\frac{m!}{(m-n)!n!}\\left(\\frac{\\lambda}{\\mu}\\right)^nP_0",
            descripcion: "Número promedio de servidores libres.",
          },
          {
            titulo: "Número promedio de estaciones en servicio",
            expresion: "L_S=s-L_D",
            descripcion: "Número promedio de servidores ocupados.",
          },
          {
            titulo: "Tiempo medio de permanencia en el sistema",
            expresion: "W=\\frac{L}{(m-L)\\lambda}",
            descripcion:
              "Tiempo promedio que un cliente permanece en el sistema.",
          },
          {
            titulo: "Tiempo medio de permanencia en la cola",
            expresion: "W_q=\\frac{L_q}{(m-L)\\lambda}",
            descripcion: "Tiempo promedio que un cliente espera en la cola.",
          },
          {
            titulo: "Tiempo medio de permanencia en el servicio",
            expresion: "W_S=W-W_q",
            descripcion:
              "Tiempo promedio que un cliente permanece siendo atendido.",
          },
        ]}
      />
      <SeccionEjemplo
        titulo="Ejemplo Resuelto"
        descripcion="Supongamos una población finita m = 6 clientes, s = 2 servidores, λ = 3 clientes/hora y μ = 4 clientes/hora."
        pasos={[
          "Calcular el factor de utilización.\nρ = λ/(sμ) = 3/(2×4) = 3/8 = 0.375",

          "Calcular la probabilidad de sistema vacío.\nSe evalúan las dos sumatorias de la fórmula de P₀ sustituyendo m = 6, s = 2, λ = 3 y μ = 4.\nDespués de realizar las operaciones se obtiene P₀ ≈ 0.0956.",

          "Calcular la probabilidad Pₙ.\nPara n < s se utiliza la primera expresión y para n ≥ s la segunda, sustituyendo los valores correspondientes.",

          "Calcular el número promedio de unidades en el sistema.\nSe reemplaza cada Pₙ en la sumatoria de L obteniendo L ≈ 1.87 clientes.",

          "Calcular el número promedio de estaciones desocupadas.\nLD ≈ 0.65 estaciones.",

          "Calcular el número promedio de estaciones ocupadas.\nLS = s - LD = 2 - 0.65 = 1.35 estaciones.",

          "Calcular el número promedio de clientes en cola.\nLq = L - (s - LD) = 1.87 - (2 - 0.65) = 0.52 clientes.",

          "Calcular el tiempo promedio en el sistema.\nW = L / [(m - L)λ] = 1.87 / [(6 - 1.87)×3] = 0.151 horas.",

          "Calcular el tiempo promedio en cola.\nWq = Lq / [(m - L)λ] = 0.52 / [(6 - 1.87)×3] = 0.042 horas.",

          "Calcular el tiempo promedio en servicio.\nWs = W - Wq = 0.151 - 0.042 = 0.109 horas.",
        ]}
      />
    </div>
  );
}
