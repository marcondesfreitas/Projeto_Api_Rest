"use client";

import { useEffect, useState } from "react";

type Client = {
  id: string;
  name: string;
  email: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function loadClients() {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
  }

  useEffect(() => {
    loadClients();
  }, []);

  async function createClient() {
    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");
    loadClients();
  }

  async function updateClient(id: string) {
    const newName = prompt("Novo nome:");
    const newEmail = prompt("Novo email:");

    if (!newName || !newEmail) return;

    await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });

    loadClients();
  }

  async function deleteClient(id: string) {
    await fetch(`/api/clients/${id}`, {
      method: "DELETE",
    });

    loadClients();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Clientes</h1>

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={createClient}>Criar</button>

      <hr />

      {clients.map((c) => (
        <div key={c.id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <p>{c.name}</p>
          <p>{c.email}</p>

          <button onClick={() => updateClient(c.id)}>Editar</button>
          <button onClick={() => deleteClient(c.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}