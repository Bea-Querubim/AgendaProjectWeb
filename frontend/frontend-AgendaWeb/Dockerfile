# Etapa 1: build
FROM node:20 AS builder

WORKDIR /app

# Copia o package.json e package-lock.json (melhora cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto, incluindo .env
COPY . .

# Garante que o Nuxt leia o .env (Nuxt 3 usa `process.env`)
# Se você usa `NUXT_PUBLIC_` prefixo, ele será exposto no client

RUN npm run build

# Etapa 2: produção
FROM node:20

WORKDIR /app

# Copia tudo da etapa de build
COPY --from=builder /app ./

# Instala só dependências de produção
RUN npm install --omit=dev

# Expõe a porta do Nuxt (3000)
EXPOSE 3000

# Roda Nuxt em preview (recomendado para SSR SSG híbrido)
CMD ["npm", "run", "preview"]
