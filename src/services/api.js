// Camada de dados (o "model"): todos os pedidos às APIs ficam aqui.

const WIKI_API = 'https://pt.wikipedia.org/w/api.php'
const DOG_API = 'https://dog.ceo/api'

async function getJson(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Erro ${response.status} ao pedir ${url}`)
  return response.json()
}

// Registo de animais do abrigo (JSON servido pela própria app)
export function fetchShelterAnimals() {
  return getJson(`${import.meta.env.BASE_URL}data/animals.json`)
}

// Descrição e fotografia de várias raças num único pedido à Wikipédia
export async function fetchBreedsInfo(titles) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    origin: '*',
    redirects: '1',
    prop: 'extracts|pageimages',
    exintro: '1',
    explaintext: '1',
    exsentences: '3',
    exlimit: '20',
    piprop: 'thumbnail',
    pithumbsize: '800',
    pilimit: '20',
    titles: titles.join('|'),
  })
  const data = await getJson(`${WIKI_API}?${params}`)
  const { pages = [], normalized = [], redirects = [] } = data.query ?? {}

  const resolve = (title) => {
    const norm = normalized.find((n) => n.from === title)?.to ?? title
    return redirects.find((r) => r.from === norm)?.to ?? norm
  }

  const info = {}
  for (const title of titles) {
    const page = pages.find((p) => p.title === resolve(title))
    if (page && !page.missing) {
      info[title] = {
        extract: page.extract ?? '',
        image: page.thumbnail?.source ?? null,
        url: `https://pt.wikipedia.org/wiki/${encodeURIComponent(page.title.replaceAll(' ', '_'))}`,
      }
    }
  }
  return info
}

// Lista de fotografias reais de uma raça de cão
export async function fetchDogPhotos(slug) {
  const data = await getJson(`${DOG_API}/breed/${slug}/images`)
  return data.message ?? []
}

// Escolhe sempre as mesmas fotos para o mesmo animal (para não mudarem a cada visita)
function pickPhotos(photos, seed, count = 4) {
  if (photos.length === 0) return []
  const step = Math.max(1, Math.floor(photos.length / count))
  const picked = Array.from({ length: count }, (_, i) => photos[(seed * 7 + i * step) % photos.length])
  return [...new Set(picked)]
}

async function buildAnimals() {
  const animals = await fetchShelterAnimals()
  const titles = [...new Set(animals.map((a) => a.wikiTitle))]
  const slugs = [...new Set(animals.filter((a) => a.dogSlug).map((a) => a.dogSlug))]

  // Se uma API externa falhar, a app continua a funcionar com os dados do abrigo
  const [breeds, dogPhotos] = await Promise.all([
    fetchBreedsInfo(titles).catch(() => ({})),
    Promise.all(
      slugs.map((slug) =>
        fetchDogPhotos(slug)
          .then((photos) => [slug, photos])
          .catch(() => [slug, []]),
      ),
    ).then(Object.fromEntries),
  ])

  return animals.map((animal) => {
    const breed = breeds[animal.wikiTitle] ?? {}
    const gallery = pickPhotos(dogPhotos[animal.dogSlug] ?? [], animal.id)
    return {
      ...animal,
      breedInfo: breed.extract ?? '',
      breedUrl: breed.url ?? null,
      image: gallery[0] ?? breed.image ?? null,
      gallery,
    }
  })
}

// Cache: os dados são pedidos uma única vez por sessão
let cache = null

export function loadAnimals() {
  if (!cache) {
    cache = buildAnimals().catch((error) => {
      cache = null
      throw error
    })
  }
  return cache
}

export function clearAnimalsCache() {
  cache = null
}
