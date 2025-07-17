import { useState } from "react";

export default function OrderPage() {
  const [form, setForm] = useState({ name: "", object: "", relation: "", amount: 1, email: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Sender...");
    const res = await fetch("/api/create-labels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setStatus("Din bestilling er sendt.");
    else setStatus("Der skete en fejl.");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Bestil QR-labels</h2>
      <input placeholder="Navn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Genstand (valgfri)" value={form.object} onChange={(e) => setForm({ ...form, object: e.target.value })} />
      <input placeholder="Ejerskab (fx min mor, min ejer)" value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} />
      <input placeholder="Antal" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} required />
      <input placeholder="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <button type="submit">Bestil</button>
      <p>{status}</p>
    </form>
  );
}
