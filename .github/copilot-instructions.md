# Instruções do Copilot para Catálogo de Filmes

## Visão Geral da Arquitetura

**Catálogo de Filmes** é uma aplicação React/Vite que consome a API The Movie Database (TMDb) para exibir e pesquisar filmes. A arquitetura segue o padrão de Single Page Application (SPA) com roteamento client-side.

### Stack Técnico
- **Frontend Framework**: React 19 com Vite 6
- **Roteamento**: React Router v7
- **Ícones**: react-icons (BsXxx, BiXxx, FaStar)
- **Estilos**: SASS (sintaxe indentada) com variáveis centralizadas
- **Gerenciador de Pacotes**: Yarn
- **API Externa**: The Movie Database (TMDb) com variáveis de ambiente
- **Linting**: ESLint com suporte React/React-Hooks

## Arquitetura e Fluxos de Dados

### Estrutura de Roteamento (`src/main.jsx`)
```
/ → Home (grid infinito de top-rated)
/movie/:id → Movie (detalhes completos do filme)
/search?q=... → Search (resultados de busca)
```
Todas as páginas estão dentro do layout `App.jsx` que fornece `Navbar`, `Footer` e `ScrollToTopButton`.

### Fluxo de Dados de Filmes
1. **Home** e **Search**: Usam **Intersection Observer** para infinite scroll
   - Armazenam múltiplas páginas de resultados em `topMovies` / `movies`
   - Incrementam `page` automaticamente quando atinge viewport final
   - Estado: `loading`, `hasMore`, `page`, `restored` (scroll)
2. **Movie**: Busca filme individual por ID e renderiza detalhes completos
   - Usa hook customizado `useCountryTranslation` para traduzir países
   - Formata datas em PT-BR e converte moeda para BRL (taxa: 5.0)

### Variáveis de Ambiente Críticas
```env
VITE_API          # URL base TMDb: https://api.themoviedb.org/3/movie/
VITE_SEARCH       # URL search TMDb: https://api.themoviedb.org/3/search/movie
VITE_API_KEY      # api_key=xxx (incluído na query string)
VITE_IMG          # URL base posters: https://image.tmdb.org/t/p/w500
```
**Importante**: Sem essas variáveis, a app não renderiza conteúdo.

## Arquitetura de Estilos SASS

### Estrutura de Arquivos
```
src/
├── styles/
│   └── variables.sass          # Variáveis centralizadas (cores, espaçamento, etc)
├── index.sass                  # Estilos globais
├── App.sass                    # Estilos do layout principal
├── components/
│   ├── Navbar.sass
│   ├── Footer.sass
├── pages/
│   ├── Movie.sass
│   └── MoviesGrid.sass
```

### Sistema de Variáveis SASS
Todas as variáveis estão centralizadas em `src/styles/variables.sass`:
- **Cores**: `$primary-red`, `$primary-dark-red`, `$dark-bg`, `$white`
- **Espaçamento**: `$spacing-xs` até `$spacing-3xl` (sistema escalável)
- **Tipografia**: `$font-family-main`
- **Transições**: `$transition-fast`, `$transition-default`, `$transition-smooth`
- **Media Queries**: `$mobile-breakpoint: 600px`

### Sistema de Importação (@use)
Todos os arquivos SASS usam `@use` com alias `as v` para não poluir o namespace:
```sass
@use '../styles/variables' as v

.classe
  color: v.$primary-red
  padding: v.$spacing-md
```

### Vantagens do SASS sobre CSS
1. **Sintaxe Indentada**: Não precisa de chaves/ponto-e-vírgula - mais compacto
2. **Variáveis**: Centralizadas e reutilizáveis em todo o projeto
3. **Nesting**: Estrutura hierárquica natural
4. **Operações**: Cálculos e funções diretas no SASS
5. **Menor Tamanho**: Arquivos SASS são mais leves que SCSS

## Padrões e Convenções do Projeto

### Scroll Restoration (padrão importante)
O projeto implementa restauração manual de scroll em **múltiplas camadas**:
1. **Hook `useScrollRestoration`** (`src/hooks/useScrollRestoration.jsx`):
   - Salva scroll position em `sessionStorage` por pathname antes de descarregar/popstate
   - Restaura automaticamente ao navegar de volta
2. **History State** (em `MovieCard`):
   - `MovieCard.handleSaveScroll()` salva position em `history.replaceState({scrollPosition})`
   - Home/Search verificam `history.state?.scrollPosition` para restaurar após carregar
3. **Manual scrollRestoration**:
   - `App.jsx` define `window.history.scrollRestoration = "manual"` para controle total

**Ao adicionar novas rotas com listas**: Siga este padrão para preservar UX de scroll.

### Componentes Reutilizáveis
- **MovieCard** (`src/components/MovieCard.jsx`):
  - Props: `movie`, `showLink` (default: true)
  - Renderiza: poster, título, rating (se vote_average > 0), link
  - Salva scroll position ao navegar para detalhes
- **Navbar**: Busca com navegação via React Router
- **ScrollToTopButton**: Reutilizado em todas as páginas

### API Fetching Pattern
```jsx
// Padrão observado em Home/Search:
const getTopRatedMovies = async (pageNum) => {
    setLoading(true)
    const url = `${baseURL}?${apiKey}&page=${pageNum}&language=pt-BR`
    const data = await fetch(url).then(r => r.json())
    setMovies(prev => [...prev, ...data.results])
    setHasMore(pageNum < data.total_pages)
    setLoading(false)
}
```

## Comandos de Build e Desenvolvimento

```bash
# Desenvolvimento (Vite hot-reload com yarn)
yarn dev

# Build para produção
yarn build

# Linting
yarn lint

# Preview produção localmente
yarn preview
```

**Nota**: Projeto é hospedado em Netlify (`_redirects` configurado para SPA routing).

## Padrões de Tradução

**useCountryTranslation** (`src/hooks/useCountryTranslation.jsx`) mapeia nomes de países em inglês para português.
```jsx
const { translateCountry } = useCountryTranslation()
// Ex: translateCountry("Brazil") → "Brasil"
```

Use para qualquer campo que venha em inglês da API (ex: `production_countries[].name`).

## Diretivas de Implementação

1. **Sempre restaure scroll position** ao implementar novas listas infinitas
2. **Use Portuguese (pt-BR)** em URLs: `&language=pt-BR` em todas as requisições
3. **Trate dados nulos**: API TMDb retorna campos opcionais; use `&&` para verificar antes de renderizar
4. **State managment**: Use local state com `useState`; sem Context/Redux
5. **Favicon/Title**: Atualizam em `useEffect` por página (ex: `Home.jsx`, `Movie.jsx`)
6. **Infinite scroll**: Use Intersection Observer (não scroll events) para performance
7. **Formatação PT-BR**: Use `toLocaleString('pt-BR', {...})` para moeda/datas
8. **SASS**: Use `@use './styles/variables' as v` para importar variáveis, não `@import`

## Pontos de Integração com API

- **Filmes Top-Rated**: `${VITE_API}top_rated?${VITE_API_KEY}&page={x}&language=pt-BR`
- **Detalhes Filme**: `${VITE_API}{id}?${VITE_API_KEY}&language=pt-BR`
- **Busca**: `${VITE_SEARCH}?${VITE_API_KEY}&query={q}&page={x}&language=pt-BR`

Todos retornam estrutura: `{ results: [...], total_pages: N }`

## Considerações para Agentes IA

- **Erros comuns**: Esquecer `&language=pt-BR`, não restaurar scroll, renderizar sem verificar se dado existe
- **Debugging**: Verificar console para erros de API e verificar `.env.local` se variáveis estão presentes
- **Teste local**: Execute `yarn dev` e navegue entre rotas para validar scroll restoration
- **Estilo**: Ao modificar SASS, sempre use `@use` ao invés de `@import` para evitar deprecation warnings
- **Yarn**: Todas as operações de pacotes devem usar `yarn`, não `npm`, para manter consistência do `yarn.lock`
