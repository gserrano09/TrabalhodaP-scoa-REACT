import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          🐾 Adota<span>Já</span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Animais
          </NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </div>
    </header>
  )
}
