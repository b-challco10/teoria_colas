export interface ResultadoMMSC {
  p0: number;
  l: number;
  lq: number;
  ld: number;
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

export function calcularMMSC(
  lambda: number,
  mu: number,
  s: number,
  m: number,
): ResultadoMMSC {
  if (lambda <= 0 || mu <= 0 || s <= 0 || m <= 0) {
    throw new Error("Todos los parámetros deben ser mayores que 0");
  }

  if (s > m) {
    throw new Error("S no puede ser mayor que M");
  }

  const a = lambda / mu;

  let suma1 = 0;

  for (let n = 0; n <= s - 1; n++) {
    suma1 +=
      (factorial(m) / (factorial(m - n) * factorial(n))) * Math.pow(a, n);
  }

  let suma2 = 0;

  for (let n = s; n <= m; n++) {
    suma2 +=
      (factorial(m) / (factorial(m - n) * factorial(s) * Math.pow(s, n - s))) *
      Math.pow(a, n);
  }

  const p0 = 1 / (suma1 + suma2);

  const probabilidades: number[] = [];

  for (let n = 0; n <= m; n++) {
    let pn: number;

    if (n < s) {
      pn =
        (factorial(m) / (factorial(m - n) * factorial(n))) *
        Math.pow(a, n) *
        p0;
    } else {
      pn =
        (factorial(m) /
          (factorial(m - n) * factorial(s) * Math.pow(s, n - s))) *
        Math.pow(a, n) *
        p0;
    }

    probabilidades.push(pn);
  }

  let l = 0;

  for (let n = 0; n <= m; n++) {
    l += n * probabilidades[n];
  }

  let ld = 0;

  for (let n = 0; n <= s - 1; n++) {
    ld += (s - n) * probabilidades[n];
  }

  const ls = s - ld;

  const lq = l - ls;

  const lambdaEfectiva = (m - l) * lambda;

  const w = l / lambdaEfectiva;

  const wq = lq / lambdaEfectiva;

  const ws = w - wq;

  return {
    p0,
    l,
    lq,
    ld,
    ls,
    w,
    wq,
    ws,
  };
}
