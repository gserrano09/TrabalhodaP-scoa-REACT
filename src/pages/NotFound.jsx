import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container status">
      <h1>404 — Página não encontrada</h1>
      <Link to="/">← Voltar ao início</Link>
    </div>
  )
}
