export interface ResultadoMM1 {
  rho: number;
  p0: number;
  l: number;
  lq: number;
  w: number;
  wq: number;
}

export function calcularMM1(
  lambda: number,
  mu: number
): ResultadoMM1 {

  if (lambda <= 0 || mu <= 0) {
    throw new Error("λ y μ deben ser mayores que 0");
  }

  if (lambda >= mu) {
    throw new Error(
      "El sistema no es estable porque λ ≥ μ"
    );
  }

  const rho = lambda / mu;

  const p0 = 1 - rho;

  const l = rho / (1 - rho);

  const lq = (rho * rho) / (1 - rho);

  const w = l / lambda;

  const wq = lq / lambda;

  return {
    rho,
    p0,
    l,
    lq,
    w,
    wq,
  };
}