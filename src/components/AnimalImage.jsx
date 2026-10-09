import { useState } from 'react'
import { typeEmoji } from '../utils/format'

// Mostra a foto do animal ou um emoji se a imagem não existir / falhar
export default function AnimalImage({ animal, src = animal.image, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`img-fallback ${className}`} aria-label={animal.name}>
        {typeEmoji[animal.type] ?? '🐾'}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${animal.name}, ${animal.breed}`}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
