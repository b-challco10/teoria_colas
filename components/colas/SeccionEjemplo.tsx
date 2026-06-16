interface Props {
  titulo: string;
  descripcion: string;
  pasos: string[];
}

export default function SeccionEjemplo({ titulo, descripcion, pasos }: Props) {
  return (
    <section>
      <h2>{titulo}</h2>

      <p>{descripcion}</p>

      <ol>
        {pasos.map((paso, index) => (
          <li key={index}>{paso}</li>
        ))}
      </ol>
    </section>
  );
}
