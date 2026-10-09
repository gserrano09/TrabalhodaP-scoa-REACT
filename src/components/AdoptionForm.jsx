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
    return (
      <p className="success">
        ✅ Pedido enviado! O abrigo vai entrar em contacto contigo sobre o/a {animalName}.
      </p>
    )
  }

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        Quero adotar o/a {animalName}
      </button>
    )
  }

  return (
    <form className="adopt-form" onSubmit={handleSubmit}>
      <h2>Pedido de adoção</h2>
      <input name="name" placeholder="O teu nome" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea
        name="message"
        placeholder={`Porque queres adotar o/a ${animalName}?`}
        rows="3"
        value={form.message}
        onChange={handleChange}
      />
      <div className="form-actions">
        <button type="submit" className="btn">
          Enviar pedido
        </button>
        <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
