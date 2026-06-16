export interface ResultadoMM1K {
  rho: number;
  pk: number;
  l: number;
  lambdaEfectiva: number;
  tasaPerdida: number;
  w: number;
  wq: number;
  lq: number;
}

export function calcularMM1K(
  lambda: number,
  mu: number,
  k: number,
): ResultadoMM1K {
  if (lambda <= 0 || mu <= 0 || k <= 0) {
    throw new Error("λ, μ y K deben ser mayores que 0");
  }

  const rho = lambda / mu;

  let pk: number;
  let l: number;

  if (rho === 1) {
    pk = 1 / (k + 1);

    l = k / 2;
  } else {
    pk = (Math.pow(rho, k) * (1 - rho)) / (1 - Math.pow(rho, k + 1));

    l =
      rho / (1 - rho) -
      ((k + 1) * Math.pow(rho, k + 1)) / (1 - Math.pow(rho, k + 1));
  }

  const lambdaEfectiva = lambda * (1 - pk);

  const tasaPerdida = lambda - lambdaEfectiva;

  const w = l / lambdaEfectiva;

  const wq = w - 1 / mu;

  const lq = lambdaEfectiva * wq;

  return {
    rho,
    pk,
    l,
    lambdaEfectiva,
    tasaPerdida,
    w,
    wq,
    lq,
  };
}
