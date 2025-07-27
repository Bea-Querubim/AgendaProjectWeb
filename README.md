
# AgendaProjectWeb

Sistema web de gerenciamento de eventos, com backend em Node.js + Express + Sequelize e frontend em Nuxt 3 + Vuetify.

Projeto feito pelas alunas: 
- [Beatriz Querubim Batista](https://github.com/Bea-Querubim)
- [Thábata Cristine de Lima](https://github.com/St4rThabs)

---

## 📁 Estrutura do Projeto

```
AgendaProjectWeb/
├── backend/          # Backend Node.js com Express, Sequelize e SQLite
└── frontend/front/   # Frontend Nuxt 3 com Vuetify
```

---

## 🔧 Como rodar o projeto

### ✅ Requisitos

- Node.js (versão 18+ recomendada)
- NPM (ou Yarn)
- (Opcional) Extensão REST Client para testar rotas do backend

---

## 🔙 Backend

### 1. Acesse a pasta `backend`:

```bash
cd backend
```

### 2. Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

### 3. Instale as dependências:

```bash
npm install
```

### 4. Crie as tabelas do banco de dados:

```bash
npx sequelize db:migrate
```

### 5. Popule o banco com dados mockados (opcional):

```bash
npx sequelize db:seed:all
```

### 6. Inicie o servidor backend:

```bash
npm run dev
```

> O backend estará disponível em: [http://localhost:port que esta no seu .env ](http://localhost:)

---

## 🧑‍🎨 Frontend

### 1. Acesse a pasta do frontend:

```bash
cd frontend/front
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

> O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Funcionalidades

### Frontend
- [x] Autenticação de usuários
- [x] Criação e exclusão de eventos
- [ ] Edição de eventos
- [ ] Convite de participantes por e-mail
- [x] Visualização de agenda semanal/mensal/diaria com VCalendar
- [ ] Upload de imagens para eventos (armazenamento local) (finalizar a configuração do local storage)
- [x] Página pública com lista de eventos disponíveis
- [x] Página protegida com eventos do usuário logado

## Backend
- [x] CRUD usuarios
- [x] CRUD eventos
- [x] Associação usuario x evento ( relação muitos pra muitos)
- [x] convidar participantes
- [x] login
