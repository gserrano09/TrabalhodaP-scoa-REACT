import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AnimalDetail from './pages/AnimalDetail'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animal/:id" element={<AnimalDetail />} />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">AdotaJá · Projeto do curso de React JS</div>
      </footer>
    </>
  )
}
