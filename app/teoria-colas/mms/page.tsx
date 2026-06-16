"use client";
import SeccionEjemplo from "@/components/colas/SeccionEjemplo";
import SeccionFormulas from "@/components/colas/SeccionFormulas";
import { useState } from "react";
import { calcularMMS, ResultadoMMS } from "@/lib/modelos-colas/mms";

export default function MMSPage() {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [s, setS] = useState("");

  const [resultado, setResultado] = useState<ResultadoMMS | null>(null);

  const [error, setError] = useState("");

  const calcular = () => {
    try {
      setError("");

      const res = calcularMMS(Number(lambda), Number(mu), Number(s));

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
      <h1>Modelo M/M/S</h1>
      <hr />
      {/* Introducción */}

      <div>
        <h2>¿Qué es el modelo M/M/S?</h2>

        <p>
          El modelo M/M/S es un modelo de teoría de colas que considera
          múltiples servidores trabajando en paralelo para atender a los
          clientes. Las llegadas siguen un proceso de Poisson y los tiempos de
          servicio tienen una distribución exponencial, permitiendo analizar
          sistemas donde varias estaciones de servicio operan simultáneamente.
        </p>

        <p>
          A diferencia del modelo M/M/1, este modelo reduce los tiempos de
          espera al distribuir la carga de trabajo entre varios servidores,
          siendo una herramienta fundamental para evaluar el desempeño de
          sistemas de atención con más de un canal de servicio.
        </p>
      </div>

      {/* Características */}

      <div>
        <h2>Características</h2>

        <ul>
          <li>Llegadas según un proceso de Poisson.</li>

          <li>Tiempos de servicio con distribución exponencial.</li>

          <li>Múltiples servidores trabajando en paralelo.</li>

          <li>Población de clientes infinita.</li>

          <li>Capacidad del sistema ilimitada.</li>

          <li>
            Los clientes esperan en una única cola cuando todos los servidores
            están ocupados.
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
          <li>Bancos con varias cajas de atención.</li>

          <li>Supermercados con múltiples cajeros.</li>

          <li>Hospitales con varios consultorios o médicos.</li>

          <li>Centros de llamadas con varios operadores.</li>

          <li>Aeropuertos con varios mostradores de atención.</li>

          <li>Peajes con múltiples cabinas de cobro.</li>

          <li>Centros de servicio al cliente con varios empleados.</li>
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

      <button onClick={calcular}>Calcular</button>

      <br />
      <br />

      {error && <p>{error}</p>}

      {resultado && (
        <div>
          <h2>Resultados</h2>

          <p>ρ = {resultado.rho.toFixed(4)}</p>

          <p>P₀ = {resultado.p0.toFixed(4)}</p>

          <p>Lq = {resultado.lq.toFixed(4)}</p>

          <p>Lo = {resultado.lo.toFixed(4)}</p>

          <p>Ld = {resultado.ld.toFixed(4)}</p>

          <p>L = {resultado.l.toFixed(4)}</p>

          <p>W = {resultado.w.toFixed(4)}</p>

          <p>Wq = {resultado.wq.toFixed(4)}</p>

          <p>P(Esperar) = {resultado.pEspera.toFixed(4)}</p>
        </div>
      )}
      <SeccionFormulas
        titulo="Fórmulas del Modelo M/M/S"
        formulas={[
          {
            titulo: "Probabilidad de tener n unidades en el sistema",
            expresion:
              "P_n=\\frac{(\\lambda/\\mu)^n}{n!}P_0\\quad,\\quad 0\\le n<s",
            descripcion:
              "Probabilidad de que existan n clientes en el sistema cuando el número de clientes es menor que el número de servidores.",
          },
          {
            titulo: "Probabilidad de tener n unidades (n ≥ s)",
            expresion: "P_n=\\frac{(\\lambda/\\mu)^n}{s!\\,s^{n-s}}P_0",
            descripcion:
              "Probabilidad de que existan n clientes cuando todos los servidores están ocupados.",
          },
          {
            titulo: "Número promedio de clientes en la cola",
            expresion: "L_q=\\frac{(\\lambda/\\mu)^s\\rho}{s!(1-\\rho)^2}P_0",
            descripcion: "Cantidad promedio de clientes esperando atención.",
          },
          {
            titulo: "Número promedio de estaciones ocupadas",
            expresion: "L_o=s\\rho",
            descripcion: "Cantidad promedio de servidores ocupados.",
          },
          {
            titulo: "Número promedio de estaciones desocupadas",
            expresion: "L_D=s(1-\\rho)",
            descripcion: "Cantidad promedio de servidores libres.",
          },
          {
            titulo: "Número promedio de unidades en el sistema",
            expresion: "L=L_q+s\\rho",
            descripcion:
              "Cantidad promedio de clientes presentes en el sistema.",
          },
          {
            titulo: "Tiempo medio de permanencia en el sistema",
            expresion: "W=\\frac{L}{\\lambda}",
            descripcion:
              "Tiempo promedio que un cliente permanece en el sistema.",
          },
          {
            titulo: "Tiempo medio de permanencia en la cola",
            expresion: "W_q=\\frac{L_q}{\\lambda}",
            descripcion:
              "Tiempo promedio que un cliente espera antes de ser atendido.",
          },
          {
            titulo: "Probabilidad de que un cliente tenga que esperar",
            expresion:
              "P(N\\ge s)=\\frac{P_0(\\lambda/\\mu)^s}{s!}\\left(\\frac{s\\mu}{s\\mu-\\lambda}\\right)",
            descripcion:
              "Probabilidad de que al llegar todos los servidores estén ocupados.",
          },
          {
            titulo: "Probabilidad de permanecer más de t en el sistema",
            expresion:
              "w(t)=e^{-\\mu t}\\left\\{1+\\frac{(s\\rho)^sP_0\\left[1-e^{-\\mu t(s-1-s\\rho)}\\right]}{s!(1-\\rho)(s-1-s\\rho)}\\right\\}",
            descripcion:
              "Probabilidad de que un cliente permanezca más de un tiempo t en el sistema.",
          },
          {
            titulo: "Probabilidad de permanecer más de t en la cola",
            expresion:
              "W_q(t)=\\frac{(s\\rho)^sP_0}{s!(1-\\rho)}e^{-s\\mu t(1-\\rho)}",
            descripcion:
              "Probabilidad de que un cliente espere más de un tiempo t en la cola.",
          },
        ]}
      />
      <SeccionEjemplo
        titulo="Ejemplo Resuelto"
        descripcion="Supongamos una tasa de llegada λ = 8 clientes/hora, una tasa de servicio μ = 5 clientes/hora y s = 2 servidores."
        pasos={[
          "Calcular el factor de utilización.\nρ = λ/(sμ) = 8/(2×5) = 8/10 = 0.8",

          "Calcular la probabilidad de que el sistema esté vacío.\nP₀ = 1 / [1 + (8/5) + (8/5)²/2! + ((8/5)²×0.8)/(2!(1-0.8))] = 1 / (1 + 1.6 + 1.28 + 2.56) = 1/6.44 = 0.1553",

          "Calcular el número promedio de clientes en la cola.\nLq = [((8/5)²×0.8)/(2!(1-0.8)²)] × P₀ = (2.048/0.08) × 0.1553 = 25.6 × 0.1553 = 3.9757",

          "Calcular el número promedio de servidores ocupados.\nLo = sρ = 2×0.8 = 1.6",

          "Calcular el número promedio de servidores desocupados.\nLD = s - Lo = 2 - 1.6 = 0.4",

          "Calcular el número promedio de clientes en el sistema.\nL = Lq + Lo = 3.9757 + 1.6 = 5.5757",

          "Calcular el tiempo promedio en el sistema.\nW = L/λ = 5.5757/8 = 0.6970 horas",

          "Calcular el tiempo promedio en la cola.\nWq = Lq/λ = 3.9757/8 = 0.4970 horas",

          "Calcular la probabilidad de que un cliente tenga que esperar.\nP(N≥s) = [P₀(λ/μ)^s/s!] × [sμ/(sμ-λ)] = (0.1553×2.56/2)×(10/2) = 0.1988×5 = 0.9940",

          "Si t = 1 hora, calcular la probabilidad de permanecer más de t en la cola.\nWq(t) = [(sρ)^sP₀/(s!(1-ρ))]e^{-sμt(1-ρ)} = [(1.6²×0.1553)/(2×0.2)]e^{-2} = 0.9939×0.1353 = 0.1345",
        ]}
      />
    </div>
  );
}
