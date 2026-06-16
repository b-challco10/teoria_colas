"use client";
import SeccionEjemplo from "@/components/colas/SeccionEjemplo";
import SeccionFormulas from "@/components/colas/SeccionFormulas";
import { useState } from "react";
import { calcularMM1, ResultadoMM1 } from "@/lib/modelos-colas/mm1";
export default function MM1Page() {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [resultado, setResultado] = useState<ResultadoMM1 | null>(null);
  const [error, setError] = useState("");
  const calcular = () => {
    try {
      setError("");

      const res = calcularMM1(Number(lambda), Number(mu));

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
      <h1>Modelo M/M/1</h1>
      <hr />
      <div>
        <h2>¿Qué es el modelo M/M/1?</h2>

        <p>
          El modelo M/M/1 representa un sistema de colas con un solo servidor,
          llegadas de Poisson y tiempos de servicio con distribución
          exponencial.
        </p>

        <p>
          Es uno de los modelos más utilizados para analizar tiempos de espera y
          rendimiento en sistemas de atención.
        </p>
      </div>

      {/* Características */}

      <div>
        <h2>Características</h2>

        <ul>
          <li>Llegadas: Proceso de Poisson.</li>
          <li>Servicio: Distribución exponencial.</li>
          <li>Un solo servidor.</li>
          <li>Población infinita.</li>
          <li>Capacidad infinita.</li>
          <li>Disciplina FIFO.</li>
        </ul>
      </div>

      {/* Aplicaciones */}

      <div>
        <h2>¿Cuándo se utiliza?</h2>

        <ul>
          <li>Cajeros automáticos.</li>
          <li>Ventanillas bancarias.</li>
          <li>Consultorios.</li>
          <li>Peajes.</li>
          <li>Centros de atención.</li>
        </ul>
      </div>

      {/* Parámetros */}

      <div>
        <h2>Parámetros</h2>

        <table>
          <thead>
            <tr>
              <th>Parámetro</th>
              <th>Descripción</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>λ</td>
              <td>Tasa de llegada</td>
            </tr>

            <tr>
              <td>μ</td>
              <td>Tasa de servicio</td>
            </tr>

            <tr>
              <td>ρ</td>
              <td>Factor de utilización</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>Calculadora</h2>
        <label>λ (Tasa de llegada)</label>
        <br />
        <input
          type="number"
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
          value={mu}
          onChange={(e) => setMu(e.target.value)}
        />
      </div>

      <br />

      <button onClick={calcular}>Calcular</button>

      <br />
      <br />

      {error && <p>{error}</p>}

      {resultado && (
        <div>
          <h2>Resultados</h2>

          <p>ρ = {resultado.rho.toFixed(4)}</p>
          <p>P₀ = {resultado.p0.toFixed(4)}</p>
          <p>L = {resultado.l.toFixed(4)}</p>
          <p>Lq = {resultado.lq.toFixed(4)}</p>
          <p>W = {resultado.w.toFixed(4)}</p>
          <p>Wq = {resultado.wq.toFixed(4)}</p>
        </div>
      )}

      <SeccionFormulas
        titulo="Fórmulas del Modelo M/M/1"
        formulas={[
          {
            titulo: "Factor de utilización",
            expresion: "\\rho=\\frac{\\lambda}{\\mu}",
            descripcion: "Representa la utilización del servidor.",
          },
          {
            titulo: "Probabilidad del sistema vacío",
            expresion: "P_0=1-\\rho",
            descripcion:
              "Probabilidad de que no exista ningún cliente en el sistema.",
          },
          {
            titulo: "Número promedio en cola",
            expresion: "L_q=\\frac{\\rho^2}{1-\\rho}",
            descripcion: "Cantidad promedio de clientes esperando.",
          },
          {
            titulo: "Número promedio en el sistema",
            expresion: "L=\\frac{\\rho}{1-\\rho}",
            descripcion: "Cantidad promedio de clientes dentro del sistema.",
          },
          {
            titulo: "Tiempo promedio en cola",
            expresion: "W_q=\\frac{L_q}{\\lambda}",
            descripcion: "Tiempo promedio que espera un cliente.",
          },
          {
            titulo: "Tiempo promedio en el sistema",
            expresion: "W=\\frac{L}{\\lambda}",
            descripcion: "Tiempo promedio total de permanencia.",
          },
        ]}
      />
      <SeccionEjemplo
        titulo="Ejemplo Resuelto"
        descripcion="Supongamos λ = 4 clientes/hora y μ = 5 clientes/hora."
        pasos={[
          "Calcular el factor de utilización.\nρ = λ/μ = 4/5 = 0.8",

          "Calcular la probabilidad de sistema vacío.\nP₀ = 1 - ρ = 1 - 0.8 = 0.2",

          "Calcular el número promedio de clientes en el sistema.\nL = ρ/(1-ρ) = 0.8/0.2 = 4",

          "Calcular el número promedio de clientes en cola.\nLq = ρ²/(1-ρ) = 0.64/0.2 = 3.2",

          "Calcular el tiempo promedio en el sistema.\nW = L/λ = 4/4 = 1 hora",

          "Calcular el tiempo promedio en cola.\nWq = Lq/λ = 3.2/4 = 0.8 horas",
        ]}
      />
    </div>
  );
}
