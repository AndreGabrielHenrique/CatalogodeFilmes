// ARQUIVO: src\pages\Search.jsx
// CAMINHO RELATIVO: ./pages/Search.jsx

import { useState, useEffect, useRef, useCallback } from "react" // Importa hooks do React
import { useSearchParams } from "react-router-dom" // Importa hook para obter parâmetros de busca da URL
import MovieCard from "../components/MovieCard" // Importa componente MovieCard
import './MoviesGrid.sass' // Importa estilos Sass

const searchURL = import.meta.env.VITE_SEARCH // Obtém URL de busca da API de variável de ambiente Vite
const apiKey = import.meta.env.VITE_API_KEY // Obtém chave da API

const Search = () => { // Define componente funcional Search (Página de busca)
  const [searchParams] = useSearchParams() // Hook para acessar parâmetros de busca da URL
  const query = searchParams.get('q') // Obtém valor do parâmetro 'q' (termo de busca)

  const [movies, setMovies] = useState([]) // Estado para armazenar filmes encontrados
  const [page, setPage] = useState(1) // Estado para controlar página atual na paginação infinita
  const [loading, setLoading] = useState(false) // Estado para controlar se está carregando
  const [hasMore, setHasMore] = useState(true) // Estado para controlar se há mais páginas
  const [restored, setRestored] = useState(false) // Estado para controlar se scroll foi restaurado
  const loader = useRef(null) // Ref para elemento observado no scroll infinito

  useEffect(() => {
    // Define título da página com o termo de busca
    document.title = `Resultados da busca por ${query}`
  }, [query]) // Executa quando query mudar

  // Efeito para resetar estado quando a query mudar (nova busca)
  useEffect(() => {
    setMovies([]) // Limpa filmes
    setPage(1) // Volta para página 1
    setHasMore(true) // Assume que há mais páginas
  }, [query]) // Executa quando query mudar

  // Função assíncrona para buscar filmes com base na query
  const getSearchedMovies = async (pageNum) => {
    setLoading(true) // Ativa estado de carregamento

    const url = `${searchURL}?${apiKey}&query=${query}&page=${pageNum}&language=pt-BR` // Monta URL da API
    const response = await fetch(url) // Faz requisição
    const data = await response.json() // Converte resposta para JSON

    setMovies(prev => [...prev, ...data.results]) // Adiciona novos filmes ao estado existente

    // Se não houver resultados ou chegou à última página, define que não há mais para carregar
    if (data.results.length === 0 || pageNum >= data.total_pages) {
      setHasMore(false)
    }

    setLoading(false) // Desativa estado de carregamento
  }

  useEffect(() => {
    // Se houver query, busca filmes da página atual
    if (query) {
      getSearchedMovies(page)
    }
  }, [page, query]) // Executa quando page ou query mudarem

  // Função callback para o Intersection Observer (similar à Home)
  const handleObserver = useCallback((entries) => {
    const target = entries[0]

    if (target.isIntersecting && !loading && hasMore) {
      setPage(prev => prev + 1) // Incrementa página
    }
  }, [loading, hasMore])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    }

    const observer = new IntersectionObserver(handleObserver, options)

    if (loader.current) observer.observe(loader.current)
    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [handleObserver])

  // Efeito para restaurar posição do scroll salva (similar à Home)
  useEffect(() => {
    if (!restored && movies.length > 0) {
      const savedPosition = history.state?.scrollPosition
      if (savedPosition !== undefined) {
          setTimeout(() => {
              window.scrollTo(0, savedPosition)
          }, 100)
          setRestored(true)
      }
    }
  }, [movies, restored])

  return (
    // Fragmento React
    <>
      <div className="container">
        <h2 className="title">
            {/* Título com termo de busca destacado */}
            Resultados da busca por <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
            {/* Exibe carregando inicial se não houver filmes e estiver carregando */}
            {movies.length === 0 && loading && <p className="alert">Carregando...</p>}
            {/* Exibe "Nenhum resultado" se não houver filmes e não estiver carregando */}
            {movies.length === 0 && !loading && <p className="alert nenhum-resultado">Nenhum resultado</p>}
            {/* Mapeia filmes encontrados para componentes MovieCard */}
            {movies.length > 0 && movies.map((movie) =>
                <MovieCard key={movie.id} movie={movie} />
          )}
        </div>
      </div>
      {/* Elemento observado para scroll infinito */}
      <div ref={loader}>
        {/* Exibe carregando durante busca de mais filmes */}
        {loading && <p className="alert">Carregando...</p>}
        {/* Exibe mensagem quando não há mais resultados (apenas se já tiver algum filme) */}
        {!loading && !hasMore && movies.length > 0 && <p className="alert">Sem mais resultados</p>}
      </div>
    </>
  )
}

export default Search // Exporta componente como padrão