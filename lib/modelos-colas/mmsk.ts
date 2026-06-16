export interface ResultadoMMSK {
  rho: number;
  p0: number;
  pk: number;
  lq: number;
  lambdaEfectiva: number;
  tasaPerdida: number;
  l: number;
  w: number;
  wq: number;
}

function factorial(n: number): number {
  if (n <= 1) return 1;

  let resultado = 1;

  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }

  return resultado;
}

export function calcularMMSK(
  lambda: number,
  mu: number,
  s: number,
  k: number,
): ResultadoMMSK {
  if (lambda <= 0 || mu <= 0 || s <= 0 || k <= 0) {
    throw new Error("Todos los parámetros deben ser mayores que 0");
  }

  if (s > k) {
    throw new Error("S no puede ser mayor que K");
  }

  const rho = lambda / (s * mu);

  let p0: number;

  if (Math.abs(rho - 1) < 1e-10) {
    let suma = 0;

    for (let n = 0; n <= s; n++) {
      suma += Math.pow(s, n) / factorial(n);
    }

    p0 = 1 / ((Math.pow(s, s) / factorial(s)) * (k - s) + suma);
  } else {
    let suma = 0;

    for (let n = 0; n <= s; n++) {
      suma += Math.pow(s * rho, n) / factorial(n);
    }

    p0 =
      1 /
      ((Math.pow(s, s) * Math.pow(rho, s + 1) * (1 - Math.pow(rho, k - s))) /
        (factorial(s) * (1 - rho)) +
        suma);
  }

  const pk = ((Math.pow(s, s) * Math.pow(rho, k)) / factorial(s)) * p0;

  let lq = 0;

  if (Math.abs(rho - 1) > 1e-10) {
    lq =
      ((Math.pow(s, s) * Math.pow(rho, s + 1)) /
        (factorial(s) * Math.pow(1 - rho, 2))) *
      (1 - Math.pow(rho, k - s) - (1 - rho) * (k - s) * Math.pow(rho, k - s)) *
      p0;
  }

  const lambdaEfectiva = lambda * (1 - pk);

  const tasaPerdida = lambda - lambdaEfectiva;

  const wq = lq / lambdaEfectiva;

  const w = wq + 1 / mu;

  const l = lambdaEfectiva * w;

  return {
    rho,
    p0,
    pk,
    lq,
    lambdaEfectiva,
    tasaPerdida,
    l,
    w,
    wq,
  };
}
