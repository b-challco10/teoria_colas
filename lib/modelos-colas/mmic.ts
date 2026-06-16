export interface ResultadoMMIC {
  p0: number;
  l: number;
  lq: number;
  ls: number;
  w: number;
  wq: number;
  ws: number;
}

function factorial(n: number): number {
  if (n <= 1) return 1;

  let resultado = 1;

  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }

  return resultado;
}

export function calcularMMIC(
  lambda: number,
  mu: number,
  m: number,
): ResultadoMMIC {
  if (lambda <= 0 || mu <= 0 || m <= 0) {
    throw new Error("λ, μ y m deben ser mayores que cero");
  }

  const rho = lambda / mu;

  if (rho >= 1) {
    throw new Error("Debe cumplirse λ/μ < 1");
  }

  let suma = 0;

  for (let n = 0; n <= m; n++) {
    suma += (factorial(m) / factorial(m - n)) * Math.pow(rho, n);
  }

  const p0 = 1 / suma;

  const l = m - (mu / lambda) * (1 - p0);

  const lq = l - (1 - p0);

  const ls = l - lq;

  const w = l / (mu * (1 - p0));

  const wq = lq / (mu * (1 - p0));

  const ws = w - wq;

  return {
    p0,
    l,
    lq,
    ls,
    w,
    wq,
    ws,
  };
}
