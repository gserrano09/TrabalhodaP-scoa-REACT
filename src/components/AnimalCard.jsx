import { Link } from 'react-router-dom'
import AnimalImage from './AnimalImage'
import { formatAge } from '../utils/format'

export default function AnimalCard({ animal }) {
  return (
    <Link to={`/animal/${animal.id}`} className="card">
      <AnimalImage animal={animal} className="card-img" />
      <h3>{animal.name}</h3>
      <p>
        {animal.breed}, {formatAge(animal.ageMonths)}
      </p>
      <p>{animal.location}</p>
    </Link>
  )
}
