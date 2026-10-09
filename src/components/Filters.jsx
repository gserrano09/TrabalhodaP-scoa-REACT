// Barra de pesquisa e filtros (componente controlado pelo pai através de props)
export default function Filters({ filters, onChange, onClear, types, breeds, locations }) {
  const handle = (event) => onChange(event.target.name, event.target.value)

  return (
    <form className="filters" onSubmit={(e) => e.preventDefault()} role="search">
      <label>
        Pesquisar
        <input type="search" name="q" placeholder="Nome ou raça" value={filters.q} onChange={handle} />
      </label>
      <label>
        Tipo
        <select name="tipo" value={filters.tipo} onChange={handle}>
          <option value="">Todos</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Raça
        <select name="raca" value={filters.raca} onChange={handle}>
          <option value="">Todas</option>
          {breeds.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label>
        Localização
        <select name="local" value={filters.local} onChange={handle}>
          <option value="">Todas</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>
      <button type="button" className="btn-secondary" onClick={onClear}>
        Limpar filtros
      </button>
    </form>
  )
}
