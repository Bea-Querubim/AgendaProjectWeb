# Etapa 1: build
FROM node:20 AS builder

WORKDIR /app
COPY . .

# Instala dependências e faz build de produção
RUN npm install
RUN npm run build

# Etapa 2: imagem final para rodar em produção
FROM node:20

WORKDIR /app

# Copia arquivos da etapa de build
COPY --from=builder /app .

# Instala só dependências de produção
RUN npm install --omit=dev

# Expor a porta padrão do Nuxt
EXPOSE 3000

# Inicia o servidor em modo preview
CMD ["npm", "run", "preview"]
