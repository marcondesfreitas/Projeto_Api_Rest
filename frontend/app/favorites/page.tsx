"use client";

import { useEffect, useState } from "react";

type Client = {
  id: string;
  name: string;
};

type Favorite = {
  id: string;
  productId: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function FavoritesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState("");

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // CLIENTES
  async function loadClients() {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
  }

  // PRODUTOS (Fake Store)
  async function loadProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  }

  // FAVORITOS DO CLIENTE
  async function loadFavorites(clientId: string) {
    if (!clientId) {
      setFavorites([]);
      return;
    }

    const res = await fetch(`/api/favorites?clientId=${clientId}`);
    const data = await res.json();
    setFavorites(data);
  }

  // REMOVER FAVORITO
  async function removeFavorite(id: string) {
    await fetch(`/api/favorites/${id}`, {
      method: "DELETE",
    });

    loadFavorites(selectedClient);
  }

  useEffect(() => {
    loadClients();
    loadProducts();
  }, []);

  useEffect(() => {
    loadFavorites(selectedClient);
  }, [selectedClient]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Favoritos</h1>

      {/* SELECT CLIENTE */}
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

      <hr />

      {/* FAVORITOS */}
      {!selectedClient && <p>Selecione um cliente para ver favoritos</p>}

      {selectedClient && favorites.length === 0 && (
        <p>Esse cliente não tem favoritos</p>
      )}

      {favorites.map((f) => {
        const product = products.find((p) => p.id === f.productId);

        return (
          <div
            key={f.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h3>{product?.title || "Produto não encontrado"}</h3>
            <p>R$ {product?.price}</p>

            <button onClick={() => removeFavorite(f.id)}>
              Remover
            </button>
          </div>
        );
      })}
    </div>
  );
}