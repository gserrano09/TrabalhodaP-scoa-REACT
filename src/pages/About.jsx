export default function About() {
  return (
    <section className="container about">
      <h1>Sobre a AdotaJá</h1>
      <p>
        A AdotaJá junta num só lugar animais de vários abrigos de Portugal que procuram uma família.
        Podes pesquisar por nome, tipo, raça ou localização e ver os detalhes de cada animal antes de
        fazeres um pedido de adoção.
      </p>

      <h2>Como funciona</h2>
      <ol>
        <li>Explora a lista e usa os filtros para encontrar o animal ideal.</li>
        <li>Abre a ficha do animal para conhecer a sua história e a raça.</li>
        <li>Carrega em "Quero adotar" e envia o teu pedido ao abrigo.</li>
      </ol>

      <h2>Dados utilizados</h2>
      <ul>
        <li>Registo dos animais do abrigo (ficheiro JSON da aplicação).</li>
        <li>
          Fotografias de cães: <a href="https://dog.ceo/dog-api/" target="_blank" rel="noreferrer">Dog CEO API</a>
        </li>
        <li>
          Descrições e fotografias das raças:{' '}
          <a href="https://pt.wikipedia.org" target="_blank" rel="noreferrer">Wikipédia (API MediaWiki)</a>
        </li>
      </ul>

      <h2>Tecnologias</h2>
      <p>React 19, React Router, Vite e Vitest + Testing Library. Projeto do curso de React JS.</p>
    </section>
  )
}
