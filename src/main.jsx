// ARQUIVO: src\main.jsx
// CAMINHO RELATIVO: ./main.jsx

import { StrictMode } from 'react' // Importa StrictMode para destacar potenciais problemas no React
import { createRoot } from 'react-dom/client' // Importa createRoot para renderizar a aplicação
import './index.sass' // Importa estilos globais
import App from './App.jsx' // Importa o componente principal App
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Importa componentes de roteamento
import Home from './pages/Home' // Importa a página Home
import Movie from './pages/Movie' // Importa a página de detalhes do filme
import Search from './pages/Search' // Importa a página de busca

// Cria a raiz da aplicação no elemento com id 'root' e renderiza o conteúdo
createRoot(document.getElementById('root')).render(
  // StrictMode ativa verificações adicionais para a aplicação em desenvolvimento
  <StrictMode>
    {/* BrowserRouter fornece o contexto de roteamento para a aplicação */}
    <BrowserRouter>
      {/* Routes define as rotas da aplicação */}
      <Routes>
        {/* Rota principal que usa o componente App como layout, com Outlet para as rotas filhas */}
        <Route element={<App />}>
          {/* Rota para a página inicial (Home) */}
          <Route path="/" element={<Home />} />
          {/* Rota para a página de detalhes do filme, com parâmetro :id */}
          <Route path="movie/:id" element={<Movie />} />
          {/* Rota para a página de busca */}
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)