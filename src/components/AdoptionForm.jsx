import { useState } from 'react'

const empty = { name: '', email: '', message: '' }

// Formulário controlado: cada campo é guardado no state
export default function AdoptionForm({ animalName }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
    setForm(empty)
  }

  if (sent) {
    return <p className="success">Recebemos o teu pedido. O abrigo vai contactar-te por email.</p>
  }

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        Pedir para adotar
      </button>
    )
  }

  return (
    <form className="adopt-form" onSubmit={handleSubmit}>
      <h2>Pedido de adoção: {animalName}</h2>
      <label>
        Nome
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Mensagem (opcional)
        <textarea name="message" rows="3" value={form.message} onChange={handleChange} />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn">
          Enviar
        </button>
        <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
