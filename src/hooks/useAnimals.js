import { useEffect, useState } from 'react'
import { loadAnimals } from '../services/api'

// Hook personalizado: carrega os animais e expõe o estado do pedido
export function useAnimals() {
  const [state, setState] = useState({ animals: [], loading: true, error: null })

  useEffect(() => {
    let active = true
    loadAnimals()
      .then((animals) => active && setState({ animals, loading: false, error: null }))
      .catch((error) => active && setState({ animals: [], loading: false, error: error.message }))
    return () => {
      active = false
    }
  }, [])

  return state
}

// Hook personalizado: devolve um animal pelo id
export function useAnimal(id) {
  const { animals, loading, error } = useAnimals()
  const animal = animals.find((a) => String(a.id) === String(id)) ?? null
  return { animal, loading, error }
}
