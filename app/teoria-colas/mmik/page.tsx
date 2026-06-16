"use client";
import SeccionEjemplo from "@/components/colas/SeccionEjemplo";
import SeccionFormulas from "@/components/colas/SeccionFormulas";
import { useState } from "react";
import { calcularMM1K } from "@/lib/modelos-colas/mm1k";

export default function MM1KPage() {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [k, setK] = useState("");

  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const res = calcularMM1K(Number(lambda), Number(mu), Number(k));

    setResultado(res);
  };

  return (
    <div>
      <h1>Modelo M/M/1/K</h1>
      <hr />
      <div>
        <h2>¿Qué es el modelo M/M/1/K?</h2>

        <p>
          El modelo M/M/1/K es una extensión del modelo M/M/1 de teoría de
          colas, donde existe un único servidor y una capacidad máxima de
          clientes en el sistema. Esto significa que solo pueden permanecer
          hasta K clientes entre los que están siendo atendidos y los que
          esperan en la cola.
        </p>

        <p>
          Cuando el sistema alcanza su capacidad máxima, los nuevos clientes que
          intentan ingresar son rechazados o perdidos, lo que provoca una
          reducción en la tasa efectiva de llegadas. Este modelo permite
          analizar el impacto de las limitaciones de capacidad sobre el
          rendimiento del sistema.
        </p>
      </div>

      {/* Características */}

      <div>
        <h2>Características</h2>

        <ul>
          <li>Llegadas según un proceso de Poisson.</li>

          <li>Tiempos de servicio con distribución exponencial.</li>

          <li>Un único servidor.</li>

          <li>Capacidad máxima del sistema igual a K clientes.</li>

          <li>
            Cuando el sistema está lleno, las nuevas llegadas son rechazadas.
          </li>

          <li>
            Disciplina de atención FIFO (primero en entrar, primero en salir).
          </li>

          <li>Permite calcular la probabilidad de pérdida de clientes.</li>
        </ul>
      </div>

      {/* Aplicaciones */}

      <div>
        <h2>¿Cuándo se utiliza?</h2>

        <ul>
          <li>Sistemas de atención con una sala de espera limitada.</li>

          <li>Estacionamientos con un número fijo de plazas.</li>

          <li>Centros de llamadas con capacidad máxima de espera.</li>

          <li>Buffers en redes de computadoras con memoria limitada.</li>

          <li>
            Procesos industriales donde solo puede almacenarse una cantidad
            máxima de productos.
          </li>

          <li>Sistemas de producción con capacidad restringida.</li>
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
        <label>K (Capacidad del sistema)</label>

        <br />
        <input type="number" value={k} onChange={(e) => setK(e.target.value)} />
      </div>
      <br />
      <button onClick={calcular}>Calcular</button>
      <br />
      <br />

      {resultado && (
        <div>
          <p>ρ = {resultado.rho}</p>

          <p>Pk = {resultado.pk}</p>

          <p>L = {resultado.l}</p>

          <p>λ efectiva ={resultado.lambdaEfectiva}</p>

          <p>Tasa pérdida ={resultado.tasaPerdida}</p>

          <p>Lq = {resultado.lq}</p>

          <p>W = {resultado.w}</p>

          <p>Wq = {resultado.wq}</p>
        </div>
      )}
      <SeccionFormulas
        titulo="Fórmulas del Modelo M/M/1/K"
        formulas={[
          {
            titulo: "Factor de utilización",
            expresion: "\\rho=\\frac{\\lambda}{\\mu}",
            descripcion: "Representa el grado de utilización del servidor.",
          },
          {
            titulo: "Probabilidad de que el sistema esté vacío",
            expresion: "P_0=\\frac{1-\\rho}{1-\\rho^{K+1}}",
            descripcion:
              "Probabilidad de que no existan clientes en el sistema.",
          },
          {
            titulo: "Probabilidad de tener n clientes en el sistema",
            expresion: "P_n=\\rho^nP_0",
            descripcion:
              "Probabilidad de que existan exactamente n clientes en el sistema.",
          },
          {
            titulo: "Probabilidad de sistema lleno",
            expresion: "P_K=\\rho^KP_0",
            descripcion:
              "Probabilidad de que el sistema alcance su capacidad máxima.",
          },
          {
            titulo: "Tasa efectiva de llegada",
            expresion: "\\bar{\\lambda}=\\lambda(1-P_K)",
            descripcion:
              "Tasa promedio de clientes que realmente ingresan al sistema.",
          },
          {
            titulo: "Número promedio de clientes en el sistema",
            expresion: "L=\\bar{\\lambda}W",
            descripcion:
              "Cantidad promedio de clientes presentes en el sistema.",
          },
          {
            titulo: "Número promedio de clientes en la cola",
            expresion: "L_q=L-(1-P_0)",
            descripcion: "Cantidad promedio de clientes esperando atención.",
          },
          {
            titulo: "Tiempo promedio en el sistema",
            expresion: "W=W_q+\\frac{1}{\\mu}",
            descripcion:
              "Tiempo promedio que un cliente permanece en el sistema.",
          },
          {
            titulo: "Tiempo promedio en la cola",
            expresion: "W_q=\\frac{L_q}{\\bar{\\lambda}}",
            descripcion:
              "Tiempo promedio que un cliente espera antes de ser atendido.",
          },
          {
            titulo: "Tasa promedio de pérdida",
            expresion: "\\lambda-\\bar{\\lambda}",
            descripcion:
              "Número promedio de clientes que no ingresan al sistema por estar lleno.",
          },
        ]}
      />
      <SeccionEjemplo
        titulo="Ejemplo Resuelto"
        descripcion="Supongamos una tasa de llegada λ = 4 clientes/hora, una tasa de servicio μ = 5 clientes/hora y una capacidad máxima K = 5 clientes."
        pasos={[
          "Calcular el factor de utilización.\nρ = λ/μ = 4/5 = 0.8",

          "Calcular la probabilidad de que el sistema esté vacío.\nP₀ = (1 - ρ)/(1 - ρ^(K+1)) = (1 - 0.8)/(1 - 0.8⁶) = 0.2/0.737856 = 0.2711",

          "Calcular la probabilidad de que el sistema esté lleno.\nPk = ρᴷ · P₀ = 0.8⁵ × 0.2711 = 0.32768 × 0.2711 = 0.0888",

          "Calcular la tasa efectiva de llegada.\nλ̄ = λ(1 - Pk) = 4(1 - 0.0888) = 4 × 0.9112 = 3.6448 clientes/hora",

          "Calcular el número promedio de clientes en el sistema.\nL = λ̄ · W (una vez calculado W).",

          "Calcular el tiempo promedio en el sistema.\nW = Wq + 1/μ",

          "Calcular el tiempo promedio en la cola.\nWq = Lq/λ̄",

          "Calcular la tasa promedio de pérdida.\nλ - λ̄ = 4 - 3.6448 = 0.3552 clientes/hora",
        ]}
      />
    </div>
  );
}
