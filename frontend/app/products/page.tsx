"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type Client = {
  id: string;
  name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState("");

  async function loadProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  }

  async function loadClients() {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
  }

  useEffect(() => {
    loadProducts();
    loadClients();
  }, []);

  async function addFavorite(productId: number) {
    if (!selectedClient) {
      alert("Selecione um cliente primeiro");
      return;
    }

    await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clientId: selectedClient,
        productId
      })
    });

    alert("Adicionado aos favoritos!");
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Produtos</h1>

      <select
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Selecione um cliente</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <img src={p.image} width={80} />
            <h3>{p.title}</h3>
            <p>R$ {p.price}</p>

            <button onClick={() => addFavorite(p.id)}>
              ❤️ Favoritar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}