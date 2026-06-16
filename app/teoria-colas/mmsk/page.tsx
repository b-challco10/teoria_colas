"use client";
import SeccionEjemplo from "@/components/colas/SeccionEjemplo";
import SeccionFormulas from "@/components/colas/SeccionFormulas";
import { useState } from "react";
import { calcularMMSK, ResultadoMMSK } from "@/lib/modelos-colas/mmsk";

export default function MMSKPage() {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [s, setS] = useState("");
  const [k, setK] = useState("");

  const [resultado, setResultado] = useState<ResultadoMMSK | null>(null);

  const [error, setError] = useState("");

  const calcular = () => {
    try {
      setError("");

      const res = calcularMMSK(
        Number(lambda),
        Number(mu),
        Number(s),
        Number(k),
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
      <h1>Modelo M/M/S/K</h1>

      <hr />
      {/* Introducción */}

      <div>
        <h2>¿Qué es el modelo M/M/S/K?</h2>

        <p>
          El modelo M/M/S/K es una extensión del modelo M/M/S que considera
          múltiples servidores y una capacidad máxima limitada del sistema. Esto
          significa que solo pueden permanecer hasta K clientes entre los que
          están siendo atendidos y los que esperan en la cola.
        </p>

        <p>
          Cuando el sistema alcanza su capacidad máxima, las nuevas llegadas no
          pueden ingresar y se consideran clientes perdidos o rechazados. Este
          modelo permite analizar el efecto de la capacidad limitada sobre el
          rendimiento del sistema y calcular indicadores como la probabilidad de
          bloqueo, la tasa efectiva de llegada y el tiempo promedio de espera.
        </p>
      </div>

      {/* Características */}

      <div>
        <h2>Características</h2>

        <ul>
          <li>Llegadas según un proceso de Poisson.</li>

          <li>Tiempos de servicio con distribución exponencial.</li>

          <li>Múltiples servidores trabajando en paralelo.</li>

          <li>Capacidad máxima del sistema igual a K clientes.</li>

          <li>
            Cuando el sistema está lleno, las nuevas llegadas son rechazadas.
          </li>

          <li>
            Existe una tasa efectiva de llegada menor que la tasa de llegada
            original.
          </li>

          <li>Permite calcular la probabilidad de pérdida de clientes.</li>

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
            Centros de llamadas con un número limitado de posiciones de espera.
          </li>

          <li>
            Hospitales con varias salas de atención y capacidad restringida.
          </li>

          <li>
            Supermercados con múltiples cajas y espacio limitado para formar
            filas.
          </li>

          <li>
            Sistemas informáticos con varios servidores y buffers de capacidad
            finita.
          </li>

          <li>
            Estacionamientos con varios accesos y un número máximo de vehículos.
          </li>

          <li>
            Procesos industriales con varias estaciones de servicio y
            almacenamiento limitado.
          </li>

          <li>
            Sistemas de telecomunicaciones donde las solicitudes adicionales son
            bloqueadas cuando se alcanza la capacidad máxima.
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
        <label>K (Capacidad máxima)</label>

        <br />

        <input type="number" value={k} onChange={(e) => setK(e.target.value)} />
      </div>

      <br />

      <button onClick={calcular}>Calcular</button>

      <br />
      <br />

      {error && <p>{error}</p>}

      {resultado && (
        <div>
          <h2>Resultados</h2>

          <p>ρ ={resultado.rho.toFixed(4)}</p>

          <p>P₀ ={resultado.p0.toFixed(4)}</p>

          <p>Pk ={resultado.pk.toFixed(4)}</p>

          <p>Lq ={resultado.lq.toFixed(4)}</p>

          <p>λ efectiva ={resultado.lambdaEfectiva.toFixed(4)}</p>

          <p>Tasa de pérdida ={resultado.tasaPerdida.toFixed(4)}</p>

          <p>L ={resultado.l.toFixed(4)}</p>

          <p>W ={resultado.w.toFixed(4)}</p>

          <p>Wq ={resultado.wq.toFixed(4)}</p>
        </div>
      )}
      <SeccionFormulas
        titulo="Fórmulas del Modelo M/M/S/K"
        formulas={[
          {
            titulo: "Factor de utilización",
            expresion: "\\rho=\\frac{\\lambda}{s\\mu}",
            descripcion:
              "Representa el grado de utilización del sistema con múltiples servidores.",
          },
          {
            titulo: "Probabilidad de que el sistema esté vacío (ρ ≠ 1)",
            expresion:
              "P_0=\\frac{1}{\\frac{s^s\\rho^{s+1}(1-\\rho^{k-s})}{s!(1-\\rho)}+\\sum_{n=0}^{s}\\frac{(s\\rho)^n}{n!}}",
            descripcion:
              "Probabilidad de que no existan clientes en el sistema cuando ρ es diferente de 1.",
          },
          {
            titulo: "Probabilidad de que el sistema esté vacío (ρ = 1)",
            expresion:
              "P_0=\\frac{1}{\\frac{s^s}{s!}(k-s)+\\sum_{n=0}^{s}\\frac{s^n}{n!}}",
            descripcion:
              "Caso especial cuando el factor de utilización es igual a 1.",
          },
          {
            titulo:
              "Probabilidad de tener n unidades en el sistema (1 ≤ n ≤ s)",
            expresion: "P_n=\\frac{(s\\rho)^n}{n!}P_0",
            descripcion:
              "Probabilidad de que existan n clientes mientras aún hay servidores disponibles.",
          },
          {
            titulo:
              "Probabilidad de tener n unidades en el sistema (s < n ≤ k)",
            expresion: "P_n=\\frac{s^s\\rho^n}{s!}P_0",
            descripcion:
              "Probabilidad de que existan n clientes cuando todos los servidores están ocupados.",
          },
          {
            titulo: "Número promedio de clientes en la cola",
            expresion:
              "L_q=\\frac{s^s\\rho^{s+1}}{s!(1-\\rho)^2}\\left[1-\\rho^{k-s}-(1-\\rho)(k-s)\\rho^{k-s}\\right]P_0",
            descripcion:
              "Cantidad promedio de clientes esperando para ser atendidos.",
          },
          {
            titulo: "Tasa media de filtraje",
            expresion: "\\bar{\\lambda}=\\lambda(1-P_k)",
            descripcion: "Tasa efectiva de llegada de clientes al sistema.",
          },
          {
            titulo: "Tasa promedio de pérdida",
            expresion: "\\lambda-\\bar{\\lambda}",
            descripcion:
              "Cantidad promedio de clientes que no ingresan al sistema porque está lleno.",
          },
          {
            titulo: "Número promedio de unidades en el sistema",
            expresion: "L=\\bar{\\lambda}W",
            descripcion: "Número promedio de clientes presentes en el sistema.",
          },
          {
            titulo: "Tiempo medio de permanencia en el sistema",
            expresion: "W=W_q+\\frac{1}{\\mu}",
            descripcion:
              "Tiempo promedio que un cliente permanece dentro del sistema.",
          },
          {
            titulo: "Tiempo medio de permanencia en la cola",
            expresion: "W_q=\\frac{L_q}{\\bar{\\lambda}}",
            descripcion:
              "Tiempo promedio que un cliente espera antes de ser atendido.",
          },
        ]}
      />
      <SeccionEjemplo
        titulo="Ejemplo Resuelto"
        descripcion="Supongamos λ = 8 clientes/hora, μ = 5 clientes/hora, s = 2 servidores y una capacidad máxima K = 6 clientes."
        pasos={[
          "Calcular el factor de utilización.\nρ = λ/(sμ) = 8/(2×5) = 0.8",

          "Calcular la probabilidad de sistema vacío.\nSe sustituye ρ = 0.8, s = 2 y K = 6 en la expresión de P₀ obteniendo P₀ ≈ 0.1008.",

          "Calcular la probabilidad de tener n clientes en el sistema.\nPara n ≤ s se usa la primera expresión y para n > s la segunda expresión de Pₙ.",

          "Calcular el número promedio de clientes en cola.\nSustituyendo los valores en la fórmula se obtiene Lq ≈ 1.48 clientes.",

          "Calcular la probabilidad de sistema lleno.\nPk = s^sρ^K/s! × P₀ = 4×0.8⁶/2 × 0.1008 ≈ 0.0528.",

          "Calcular la tasa efectiva de llegada.\nλ̄ = λ(1 - Pk) = 8(1 - 0.0528) = 7.5776 clientes/hora.",

          "Calcular la tasa promedio de pérdida.\nλ - λ̄ = 8 - 7.5776 = 0.4224 clientes/hora.",

          "Calcular el tiempo promedio en cola.\nWq = Lq/λ̄ = 1.48/7.5776 = 0.195 horas.",

          "Calcular el tiempo promedio en el sistema.\nW = Wq + 1/μ = 0.195 + 0.2 = 0.395 horas.",

          "Calcular el número promedio de clientes en el sistema.\nL = λ̄W = 7.5776 × 0.395 = 2.99 clientes.",
        ]}
      />
    </div>
  );
}
