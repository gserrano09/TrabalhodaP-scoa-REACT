# 🐾 AdotaJá — Aplicação de adoção de animais

Projeto do curso de React JS: uma aplicação para encontrar animais para adoção.

## Funcionalidades

- **Página inicial** com a listagem dos animais disponíveis (nome, tipo, raça, imagem)
- **Pesquisa e filtros** por nome, tipo, raça e localização (os filtros ficam no URL)
- **Página de detalhe** com história, localização, abrigo, galeria de fotos e descrição da raça
- **Formulário de adoção** (formulário controlado com `useState`)
- **Página "Sobre"** e página 404

## Conceitos de React aplicados

| Conceito | Onde |
| --- | --- |
| Componentes funcionais e props | `src/components/` |
| useState / eventos | `AdoptionForm.jsx`, `AnimalDetail.jsx` |
| useEffect + hook personalizado | `src/hooks/useAnimals.js` |
| Fetch de APIs | `src/services/api.js` |
| Renderização condicional e listas (`map` + `key`) | `Home.jsx` |
| React Router (rotas, parâmetros, links) | `App.jsx`, `AnimalDetail.jsx` |

## Fontes de dados

- `public/data/animals.json` — registo dos animais do abrigo
- [Dog CEO API](https://dog.ceo/dog-api/) — fotografias reais dos cães
- [Wikipédia PT](https://pt.wikipedia.org) (API MediaWiki) — descrição e fotografia das raças

Não é necessária base de dados nem chaves de API.

## Como correr

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm test         # testes de navegação (Vitest + Testing Library)
npm run build    # build de produção (pasta dist)
```

## Publicação

- **Vercel**: importar o repositório em [vercel.com/new](https://vercel.com/new) (deteta Vite automaticamente).
- **GitHub Pages** (alternativa): `npm run deploy`.
