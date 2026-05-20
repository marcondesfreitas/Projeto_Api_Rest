# 📌 Favorites App — API REST + Frontend

Sistema desenvolvido como atividade prática de DevOps, com uma API REST e frontend para gerenciamento de clientes e seus produtos favoritos.

A aplicação consome a Fake Store API para exibir produtos reais e permite que cada cliente salve seus favoritos.

---

# 🚀 Tecnologias utilizadas

- Next.js 16 (App Router)
- TypeScript
- Prisma ORM
- SQLite
- Docker + Docker Compose
- Fake Store API
- React Hooks

---

# 📦 Funcionalidades

## 👤 Clientes
- Criar cliente
- Listar clientes
- Editar cliente
- Remover cliente
- E-mail único (validação)

## ❤️ Favoritos
- Adicionar produto aos favoritos
- Listar favoritos por cliente
- Remover favorito
- Evitar duplicação (cliente + produto)

## 🌐 Produtos (API externa)
- Integração com Fake Store API
- Listagem de produtos reais
- Uso de:
  - título
  - imagem
  - preço
  - avaliações

---

# 🔗 API Externa

👉 https://fakestoreapi.com/products

Endpoints usados:

- GET /products
- GET /products/{id}

---

# 📁 Estrutura do projeto

app/
 ├── api/
 │   ├── clients/
 │   ├── favorites/
 │   └── products/
 │
 ├── clients/
 ├── favorites/
 └── page.tsx

components/
 ├── ClientCard.tsx
 ├── Header.tsx
 └── Footer.tsx

lib/
 ├── prisma.ts

prisma/
 └── schema.prisma

---

# 🧠 Modelo de dados (Prisma)

model Client {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  favorites Favorite[]
  createdAt DateTime @default(now())
}

model Favorite {
  id        String   @id @default(cuid())
  productId Int
  clientId  String
  client    Client   @relation(fields: [clientId], references: [id])
  createdAt DateTime @default(now())

  @@unique([clientId, productId])
}

---

# ▶️ Como rodar o projeto

## Instalação

npm install

## Prisma

npx prisma generate
npx prisma migrate dev

## Rodar local

npm run dev

http://localhost:3000

---

# 🐳 Docker

docker-compose up --build

http://localhost:3000

---

# ⚙️ Dockerfile

FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

---

# 📦 docker-compose.yml

version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:./dev.db

---

# 📌 Endpoints

## Clientes
- GET /api/clients
- POST /api/clients
- PUT /api/clients/[id]
- DELETE /api/clients/[id]

## Favoritos
- GET /api/favorites?clientId=ID
- POST /api/favorites
- DELETE /api/favorites/[id]

---

# 👨‍💻 Autor

Projeto desenvolvido para atividade de DevOps (API REST + Frontend + Docker + Prisma).
