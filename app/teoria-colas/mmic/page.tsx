"use client";
import SeccionEjemplo from "@/components/colas/SeccionEjemplo";
import SeccionFormulas from "@/components/colas/SeccionFormulas";
import { useState } from "react";
import { calcularMMIC, ResultadoMMIC } from "@/lib/modelos-colas/mmic";

export default function MMICPage() {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [m, setM] = useState("");

  const [resultado, setResultado] = useState<ResultadoMMIC | null>(null);

  const [error, setError] = useState("");

  const calcular = () => {
    try {
      setError("");

      const res = calcularMMIC(Number(lambda), Number(mu), Number(m));

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
      <h1>Modelo M/M/1/C</h1>
      <hr />
      <div>

  <h2>¿Qué es el modelo M/M/1/C?</h2>

  <p>
    El modelo M/M/1/C es un modelo de teoría de colas que considera un
    único servidor y una población finita de clientes. A diferencia del
    modelo M/M/1 clásico, el número de clientes que pueden solicitar el
    servicio está limitado, por lo que la tasa de llegada depende de la
    cantidad de clientes que aún se encuentran fuera del sistema.
  </p>

  <p>
    Este modelo permite analizar sistemas donde existe una cantidad fija
    de usuarios que compiten por un mismo recurso, siendo ampliamente
    utilizado para evaluar el desempeño de sistemas de producción,
    mantenimiento, informática y telecomunicaciones.
  </p>

</div>

{/* Características */}

<div>

  <h2>Características</h2>

  <ul>
    <li>Llegadas: Proceso de Poisson.</li>
    <li>Servicio: Distribución exponencial.</li>
    <li>Un solo servidor.</li>
    <li>Población finita (C clientes).</li>
    <li>Capacidad máxima igual al tamaño de la población.</li>
    <li>Disciplina de atención FIFO.</li>
  </ul>

</div>

{/* Aplicaciones */}

<div>

  <h2>¿Cuándo se utiliza?</h2>

  <ul>
    <li>Mantenimiento de un conjunto limitado de máquinas.</li>
    <li>Reparación de equipos en una empresa.</li>
    <li>Redes de computadoras con un número fijo de terminales.</li>
    <li>Sistemas de producción con recursos limitados.</li>
    <li>Modelos de soporte técnico con una cantidad fija de usuarios.</li>
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

          <p>Ls ={resultado.ls.toFixed(4)}</p>

          <p>W ={resultado.w.toFixed(4)}</p>

          <p>Wq ={resultado.wq.toFixed(4)}</p>

          <p>Ws ={resultado.ws.toFixed(4)}</p>
        </div>
      )}
      <SeccionFormulas
  titulo="Fórmulas del Modelo M/M/1/C"
  formulas={[
    {
      titulo: "Probabilidad de sistema vacío",
      expresion:
        "P_0=\\frac{1}{\\sum_{n=0}^{m}\\frac{m!}{(m-n)!}\\left(\\frac{\\lambda}{\\mu}\\right)^n}",
      descripcion:
        "Probabilidad de que el sistema se encuentre completamente vacío.",
    },
    {
      titulo: "Probabilidad de tener n unidades en el sistema",
      expresion:
        "P_n=\\frac{m!}{(m-n)!}\\left(\\frac{\\lambda}{\\mu}\\right)^nP_0",
      descripcion:
        "Probabilidad de que existan exactamente n clientes en el sistema.",
    },
    {
      titulo: "Número promedio de unidades en el sistema",
      expresion:
        "L=m-\\frac{\\mu}{\\lambda}(1-P_0)",
      descripcion:
        "Cantidad promedio de clientes presentes en el sistema.",
    },
    {
      titulo: "Número promedio de clientes en la cola",
      expresion:
        "L_q=L-(1-P_0)",
      descripcion:
        "Cantidad promedio de clientes esperando para ser atendidos.",
    },
    {
      titulo: "Número promedio de unidades en servicio",
      expresion:
        "L_s=L-L_q",
      descripcion:
        "Cantidad promedio de clientes que están siendo atendidos.",
    },
    {
      titulo: "Tiempo medio de permanencia en el sistema",
      expresion:
        "W=\\frac{L}{\\lambda(m-L)}",
      descripcion:
        "Tiempo promedio que un cliente permanece dentro del sistema.",
    },
    {
      titulo: "Tiempo medio de permanencia en la cola",
      expresion:
        "W_q=\\frac{L_q}{\\lambda(m-L)}",
      descripcion:
        "Tiempo promedio que un cliente espera antes de recibir servicio.",
    },
    {
      titulo: "Tiempo medio de permanencia en servicio",
      expresion:
        "W_s=W-W_q",
      descripcion:
        "Tiempo promedio que un cliente permanece siendo atendido.",
    },
  ]}
/>
<SeccionEjemplo
  titulo="Ejemplo Resuelto"
  descripcion="Supongamos una población finita de m = 5 clientes, una tasa de llegada λ = 2 clientes/hora y una tasa de servicio μ = 3 clientes/hora."
  pasos={[
    "Calcular λ/μ.\nλ/μ = 2/3 = 0.6667",

    "Calcular P₀.\nP₀ = 1 / [1 + 5(0.6667) + 20(0.6667²) + 60(0.6667³) + 120(0.6667⁴) + 120(0.6667⁵)] = 1 / 45.123 ≈ 0.0222",

    "Calcular L.\nL = m - (μ/λ)(1 - P₀) = 5 - (3/2)(1 - 0.0222) = 5 - 1.4667 = 3.5333",

    "Calcular Lq.\nLq = L - (1 - P₀) = 3.5333 - 0.9778 = 2.5555",

    "Calcular Ls.\nLs = L - Lq = 3.5333 - 2.5555 = 0.9778",

    "Calcular W.\nW = L / [λ(m - L)] = 3.5333 / [2(5 - 3.5333)] = 3.5333 / 2.9334 = 1.2045 horas",

    "Calcular Wq.\nWq = Lq / [λ(m - L)] = 2.5555 / 2.9334 = 0.8711 horas",

    "Calcular Ws.\nWs = W - Wq = 1.2045 - 0.8711 = 0.3334 horas",
  ]}
/>
    </div>
  );
}
