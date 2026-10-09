import { Link } from 'react-router-dom'
import AnimalImage from './AnimalImage'
import { formatAge } from '../utils/format'

export default function AnimalCard({ animal }) {
  return (
    <Link to={`/animal/${animal.id}`} className="card">
      <AnimalImage animal={animal} className="card-img" />
      <div className="card-body">
        <div className="card-top">
          <h3>{animal.name}</h3>
          <span className="badge">{animal.type}</span>
        </div>
        <p className="muted">{animal.breed}</p>
        <p className="card-meta">
          {formatAge(animal.ageMonths)} · {animal.sex} · 📍 {animal.location}
        </p>
      </div>
    </Link>
  )
}
