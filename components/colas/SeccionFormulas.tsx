import { BlockMath } from "react-katex";

interface Formula {
  titulo: string;
  expresion: string;
  descripcion?: string;
}

interface Props {
  titulo: string;
  formulas: Formula[];
}

export default function SeccionFormulas({ titulo, formulas }: Props) {
  return (
    <section>
      <h2>{titulo}</h2>

      {formulas.map((formula, index) => (
        <div key={index}>
          <h3>{formula.titulo}</h3>

          <BlockMath math={formula.expresion} />

          {formula.descripcion && <p>{formula.descripcion}</p>}

          <hr />
        </div>
      ))}
    </section>
  );
}
