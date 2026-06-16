export interface ResultadoMMS {
  rho: number;
  p0: number;
  lq: number;
  lo: number;
  ld: number;
  l: number;
  w: number;
  wq: number;
  pEspera: number;
}

function factorial(n: number): number {
  if (n <= 1) return 1;

  let resultado = 1;

  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }

  return resultado;
}

export function calcularMMS(
  lambda: number,
  mu: number,
  s: number,
): ResultadoMMS {
  if (lambda <= 0 || mu <= 0 || s <= 0) {
    throw new Error("λ, μ y S deben ser mayores que cero");
  }

  const rho = lambda / (s * mu);

  if (rho >= 1) {
    throw new Error("El sistema no es estable porque ρ ≥ 1");
  }

  const a = lambda / mu;

  let suma = 0;

  for (let n = 0; n < s; n++) {
    suma += Math.pow(a, n) / factorial(n);
  }

  suma += Math.pow(a, s) / (factorial(s) * (1 - rho));

  const p0 = 1 / suma;

  const lq =
    (Math.pow(a, s) * rho * p0) / (factorial(s) * Math.pow(1 - rho, 2));

  const lo = s * rho;

  const ld = s - lo;

  const l = lq + lo;

  const wq = lq / lambda;

  const w = wq + 1 / mu;

  const pEspera = (p0 * Math.pow(a, s)) / (factorial(s) * (1 - rho));

  return {
    rho,
    p0,
    lq,
    lo,
    ld,
    l,
    w,
    wq,
    pEspera,
  };
}
