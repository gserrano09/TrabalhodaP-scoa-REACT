import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { clearAnimalsCache } from './services/api'

const animals = [
  { id: 1, name: 'Max', type: 'Cão', breed: 'Labrador', wikiTitle: 'Labrador retriever', dogSlug: 'labrador', ageMonths: 36, sex: 'Macho', size: 'Grande', location: 'Lisboa', shelter: 'Abrigo A', vaccinated: true, sterilized: true, story: 'O Max adora bolas.' },
  { id: 2, name: 'Mia', type: 'Gato', breed: 'Persa', wikiTitle: 'Persa (gato)', ageMonths: 6, sex: 'Fêmea', size: 'Médio', location: 'Porto', shelter: 'Abrigo B', vaccinated: true, sterilized: false, story: 'A Mia é calma.' },
]

// Simula as respostas das APIs para os testes não dependerem da internet
function mockFetch(url) {
  let body
  if (url.includes('animals.json')) body = animals
  else if (url.includes('dog.ceo')) body = { message: ['https://images.dog.ceo/max.jpg'] }
  else body = { query: { pages: [{ title: 'Persa (gato)', extract: 'Raça de gato persa.' }] } }
  return Promise.resolve({ ok: true, json: () => Promise.resolve(body) })
}

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('navegação', () => {
  beforeEach(() => {
    clearAnimalsCache()
    globalThis.fetch = vi.fn(mockFetch)
  })

  it('lista os animais na página inicial', async () => {
    renderAt('/')
    expect(await screen.findByText('Max')).toBeInTheDocument()
    expect(screen.getByText('Mia')).toBeInTheDocument()
  })

  it('filtra por tipo', async () => {
    renderAt('/')
    await screen.findByText('Max')
    await userEvent.selectOptions(screen.getByLabelText('Tipo'), 'Gato')
    expect(screen.queryByText('Max')).not.toBeInTheDocument()
    expect(screen.getByText('Mia')).toBeInTheDocument()
  })

  it('abre o detalhe ao clicar num animal', async () => {
    renderAt('/')
    await userEvent.click(await screen.findByText('Mia'))
    expect(await screen.findByRole('heading', { name: 'Mia' })).toBeInTheDocument()
    expect(screen.getByText('Raça de gato persa.')).toBeInTheDocument()
  })

  it('navega para a página Sobre', async () => {
    renderAt('/')
    await userEvent.click(screen.getByRole('link', { name: 'Sobre' }))
    expect(screen.getByRole('heading', { name: 'Sobre a AdotaJá' })).toBeInTheDocument()
  })

  it('mostra 404 numa rota inexistente', () => {
    renderAt('/nao-existe')
    expect(screen.getByText(/Página não encontrada/)).toBeInTheDocument()
  })
})
