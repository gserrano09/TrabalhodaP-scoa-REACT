import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAnimals } from '../hooks/useAnimals'
import AnimalCard from '../components/AnimalCard'
import Filters from '../components/Filters'

const unique = (list) => [...new Set(list)].sort((a, b) => a.localeCompare(b, 'pt'))

export default function Home() {
  const { animals, loading, error } = useAnimals()
  // Os filtros ficam no URL, por isso mantêm-se ao voltar da página de detalhe
  const [params, setParams] = useSearchParams()
  const filters = {
    q: params.get('q') ?? '',
    tipo: params.get('tipo') ?? '',
    raca: params.get('raca') ?? '',
    local: params.get('local') ?? '',
  }

  const updateFilter = (name, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(name, value)
    else next.delete(name)
    if (name === 'tipo') next.delete('raca') // a raça depende do tipo
    setParams(next, { replace: true })
  }

  const types = useMemo(() => unique(animals.map((a) => a.type)), [animals])
  const locations = useMemo(() => unique(animals.map((a) => a.location)), [animals])
  const breeds = useMemo(
    () => unique(animals.filter((a) => !filters.tipo || a.type === filters.tipo).map((a) => a.breed)),
    [animals, filters.tipo],
  )

  const results = animals.filter((a) => {
    const text = filters.q.trim().toLowerCase()
    return (
      (!text || a.name.toLowerCase().includes(text) || a.breed.toLowerCase().includes(text)) &&
      (!filters.tipo || a.type === filters.tipo) &&
      (!filters.raca || a.breed === filters.raca) &&
      (!filters.local || a.location === filters.local)
    )
  })

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Encontra o teu novo melhor amigo</h1>
          <p>Cães, gatos e coelhos de abrigos de todo o país à espera de uma família.</p>
        </div>
      </section>

      <section className="container">
        <Filters
          filters={filters}
          onChange={updateFilter}
          onClear={() => setParams({}, { replace: true })}
          types={types}
          breeds={breeds}
          locations={locations}
        />

        {loading && <p className="status">A carregar animais…</p>}
        {error && <p className="status error">Não foi possível carregar os animais: {error}</p>}

        {!loading && !error && (
          <>
            <p className="muted count">
              {results.length} {results.length === 1 ? 'animal disponível' : 'animais disponíveis'}
            </p>
            {results.length === 0 ? (
              <p className="status">Nenhum animal corresponde à pesquisa. 😿</p>
            ) : (
              <div className="grid">
                {results.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
