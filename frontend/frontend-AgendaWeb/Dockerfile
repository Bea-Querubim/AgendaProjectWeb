# Etapa 1: Build do Nuxt
FROM node:20 AS builder

WORKDIR /app

# Copia package.json e lock para cache eficiente
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera a build do Nuxt
RUN npm run build

# Etapa 2: Imagem final de produção
FROM node:20

WORKDIR /app

# Copia apenas o necessário da build
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Define variáveis de ambiente se quiser (opcional)
# ENV NODE_ENV=production

# Expõe a porta padrão do Nuxt Preview
EXPOSE 3000

# Comando para rodar o app em produção (modo preview do Nuxt)
CMD ["npx", "nuxt", "preview"]
