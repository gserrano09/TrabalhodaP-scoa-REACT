import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAnimal } from '../hooks/useAnimals'
import AnimalImage from '../components/AnimalImage'
import AdoptionForm from '../components/AdoptionForm'
import { formatAge } from '../utils/format'

export default function AnimalDetail() {
  const { id } = useParams()
  const { animal, loading, error } = useAnimal(id)
  const [photo, setPhoto] = useState(null)
  const navigate = useNavigate()
  // Volta à lista com os filtros que estavam aplicados (ou ao início, se a página foi aberta diretamente)
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'))

  if (loading) return <p className="status container">A carregar…</p>
  if (error) return <p className="status error container">Erro: {error}</p>
  if (!animal) {
    return (
      <div className="container status">
        <h2>Animal não encontrado</h2>
        <Link to="/">Voltar à lista</Link>
      </div>
    )
  }

  const facts = [
    ['Tipo', animal.type],
    ['Raça', animal.breed],
    ['Idade', formatAge(animal.ageMonths)],
    ['Sexo', animal.sex],
    ['Porte', animal.size],
    ['Localização', animal.location],
    ['Abrigo', animal.shelter],
    ['Vacinado', animal.vaccinated ? 'Sim' : 'Não'],
    ['Esterilizado', animal.sterilized ? 'Sim' : 'Não'],
  ]

  return (
    <article className="container detail">
      <button className="back" onClick={goBack}>
        Voltar
      </button>

      <div className="detail-grid">
        <div>
          <AnimalImage key={photo} animal={animal} src={photo ?? animal.image} className="detail-img" />
          {animal.gallery.length > 1 && (
            <div className="thumbs">
              {animal.gallery.map((src) => (
                <button key={src} onClick={() => setPhoto(src)} aria-label="Ver foto">
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1>{animal.name}</h1>
          <p>{animal.story}</p>

          <table className="facts">
            <tbody>
              {facts.map(([label, value]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {animal.breedInfo && (
            <section className="breed">
              <h2>Sobre a raça</h2>
              <p>{animal.breedInfo}</p>
              {animal.breedUrl && (
                <a href={animal.breedUrl} target="_blank" rel="noreferrer">
                  Ler mais na Wikipédia
                </a>
              )}
            </section>
          )}

          <AdoptionForm animalName={animal.name} />
        </div>
      </div>
    </article>
  )
}
