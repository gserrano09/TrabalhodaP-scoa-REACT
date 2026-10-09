import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container status">
      <h1>Erro 404: Página não encontrada</h1>
      <Link to="/">Voltar à lista de animais</Link>
    </div>
  )
}
