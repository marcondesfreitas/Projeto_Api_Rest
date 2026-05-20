# Base image
FROM node:20-alpine

# Diretório da aplicação
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# 🔥 Prisma precisa ser gerado dentro do container
RUN npx prisma generate

# Build do Next.js
RUN npm run build

# Porta padrão do Next
EXPOSE 3000

# Start da aplicação
CMD ["npm", "start"]
