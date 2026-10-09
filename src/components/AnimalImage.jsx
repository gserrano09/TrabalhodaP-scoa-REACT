import { useState } from 'react'

// Mostra a foto do animal ou um aviso se a imagem não existir / falhar
export default function AnimalImage({ animal, src = animal.image, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <div className={`img-fallback ${className}`}>Sem fotografia</div>
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
