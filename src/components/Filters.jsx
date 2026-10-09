// Barra de pesquisa e filtros (componente controlado pelo pai através de props)
export default function Filters({ filters, onChange, onClear, types, breeds, locations }) {
  const handle = (event) => onChange(event.target.name, event.target.value)

  return (
    <form className="filters" onSubmit={(e) => e.preventDefault()} role="search">
      <input
        type="search"
        name="q"
        placeholder="Pesquisar por nome ou raça…"
        value={filters.q}
        onChange={handle}
        aria-label="Pesquisar"
      />
      <select name="tipo" value={filters.tipo} onChange={handle} aria-label="Tipo">
        <option value="">Todos os tipos</option>
        {types.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <select name="raca" value={filters.raca} onChange={handle} aria-label="Raça">
        <option value="">Todas as raças</option>
        {breeds.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>
      <select name="local" value={filters.local} onChange={handle} aria-label="Localização">
        <option value="">Todas as localizações</option>
        {locations.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>
      <button type="button" className="btn-secondary" onClick={onClear}>
        Limpar
      </button>
    </form>
  )
}
