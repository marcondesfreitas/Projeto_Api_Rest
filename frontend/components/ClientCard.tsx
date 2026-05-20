"use client";

import { useState } from "react";

type Client = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  client: Client;
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string, email: string) => void;
};

export default function ClientCard({ client, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
      }}
    >
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <button
            onClick={() => {
              onUpdate(client.id, name, email);
              setIsEditing(false);
            }}
          >
            Salvar
          </button>
        </>
      ) : (
        <>
          <h3>{client.name}</h3>
          <p>{client.email}</p>

          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => onDelete(client.id)}>Excluir</button>
        </>
      )}
    </div>
  );
}