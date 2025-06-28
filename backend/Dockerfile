# Usa imagem oficial do Node
FROM node:20

# Define o diretório de trabalho no container
WORKDIR /app

# Copia todos os arquivos da pasta para dentro do container
COPY package*.json ./

# Instala dependências do projeto
RUN npm install

COPY . .

# Executa as migrations para criar as tabelas no SQLite
RUN npx sequelize-cli db:migrate

# Popula o banco com os mocks de teste
RUN npx sequelize-cli db:seed:all

# Expõe a porta da aplicação
EXPOSE 3030

# Comando para iniciar o servidor
CMD ["npm", "start"]
