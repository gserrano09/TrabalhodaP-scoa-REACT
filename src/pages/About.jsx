export default function About() {
  return (
    <section className="container about">
      <h1>Sobre a AdotaJá</h1>
      <p>
        A AdotaJá mostra animais de vários abrigos de Portugal. Podes filtrar por tipo, raça ou cidade,
        ler a ficha de cada animal e enviar um pedido de adoção ao abrigo.
      </p>

      <h2>De onde vêm os dados</h2>
      <ul>
        <li>Os animais estão num ficheiro JSON da própria aplicação.</li>
        <li>
          As fotografias dos cães vêm da <a href="https://dog.ceo/dog-api/">Dog CEO API</a>.
        </li>
        <li>
          As descrições das raças e as fotos dos gatos e coelhos vêm da{' '}
          <a href="https://pt.wikipedia.org">Wikipédia</a>.
        </li>
      </ul>

      <h2>Tecnologias</h2>
      <p>React 19, React Router e Vite. Fiz este projeto para o curso de React JS.</p>
    </section>
  )
}
