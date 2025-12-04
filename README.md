# 🎬 Catálogo de Filmes

Uma aplicação web moderna para explorar e pesquisar filmes usando a API The Movie Database (TMDb).

## 📺 Referência do Projeto

Este projeto foi desenvolvido seguindo este tutorial:

[![Assista ao vídeo de referência](https://img.youtube.com/vi/XqxUHVVO7-U/maxresdefault.jpg)](https://www.youtube.com/watch?v=XqxUHVVO7-U)

## 🚀 Tecnologias

- **React 19** - Biblioteca para interface de usuário
- **Vite 6** - Build tool e dev server ultrarrápido
- **React Router v7** - Roteamento client-side
- **SASS** - Pré-processador CSS com sintaxe indentada (mais compacto)
- **Yarn** - Gerenciador de pacotes
- **The Movie Database (TMDb) API** - Fonte de dados de filmes

## 📋 Funcionalidades

- ✅ Página inicial com grid infinito de filmes top-rated
- ✅ Busca de filmes por título
- ✅ Página de detalhes completos de cada filme
- ✅ Interface responsiva e moderna
- ✅ Scroll restoration automático ao navegar
- ✅ Tradução de países para português
- ✅ Formatação de datas e moeda em pt-BR

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── main.jsx                 # Entry point
├── index.sass              # Estilos globais
├── App.jsx                 # Layout principal
├── components/
│   ├── Navbar.jsx          # Barra de navegação
│   ├── Navbar.sass
│   ├── Footer.jsx          # Rodapé
│   ├── Footer.sass
│   ├── MovieCard.jsx       # Card de filme
│   └── ScrollToTopButton.jsx
├── pages/
│   ├── Home.jsx            # Página inicial (top-rated)
│   ├── Search.jsx          # Página de busca
│   ├── Movie.jsx           # Detalhes do filme
│   ├── MoviesGrid.sass     # Estilos compartilhados
│   └── Movie.sass
├── hooks/
│   ├── useScrollRestoration.jsx
│   └── useCountryTranslation.jsx
└── styles/
    └── variables.sass      # Variáveis centralizadas
```

### Roteamento

- `/` - Home com grid infinito de filmes
- `/movie/:id` - Detalhes completo do filme
- `/search?q=...` - Resultados da busca

## 🎨 Sistema de Estilos (SASS)

O projeto usa **SASS com sintaxe indentada** (mais compacta que CSS):

- **Sem chaves ou ponto-e-vírgula** - Sintaxe mais limpa
- **Variáveis centralizadas** - Em `src/styles/variables.sass`
- **Nesting hierárquico** - Reduz repetição de seletores
- **@use com alias** - Importações modernas sem deprecation

```sass
@use '../styles/variables' as v

.elemento
  color: v.$primary-red
  padding: v.$spacing-md
```

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 16+
- Yarn (gerenciador de pacotes)

### Setup

```bash
# Instalar dependências
yarn install

# Criar arquivo .env.local com as variáveis
VITE_API=https://api.themoviedb.org/3/movie/
VITE_SEARCH=https://api.themoviedb.org/3/search/movie
VITE_API_KEY=api_key=YOUR_API_KEY
VITE_IMG=https://image.tmdb.org/t/p/w500
```

### Scripts

```bash
# Desenvolvimento (hot reload)
yarn dev

# Build para produção
yarn build

# Linting
yarn lint

# Preview da build
yarn preview
```

## 🌐 API The Movie Database (TMDb)

- **Documentação**: https://developer.themoviedb.org/docs
- **Endpoints principais**:
  - Top Rated: `/movie/top_rated`
  - Detalhes: `/movie/{id}`
  - Busca: `/search/movie`

## 📱 Padrões Importantes

### Scroll Restoration
O projeto implementa restauração de posição de scroll em múltiplas camadas:
- `useScrollRestoration` hook - Salva em sessionStorage
- `history.state` - Preserva scroll ao navegar
- App.jsx - Controle manual com `window.history.scrollRestoration`

### Infinite Scroll
Usa **Intersection Observer** para carregar automaticamente mais filmes ao atingir o final.

### Internacionalização
- Idioma: **Português (pt-BR)**
- Tradução de países: Hook `useCountryTranslation`
- Formatação de datas: `toLocaleString('pt-BR')`
- Conversão de moeda: Taxa fixa BRL (5.0)

## 🚀 Deploy

O projeto é hospedado em **Netlify** com configuração de SPA routing (`_redirects`).

## 📝 Licença

Aberto para fins educacionais e pessoais.

## 👨‍💻 Contribuições

Contribuições são bem-vindas! Faça um fork, crie uma branch com sua feature e abra um Pull Request.

---

**Desenvolvido com ❤️ usando React + Vite + SASS**