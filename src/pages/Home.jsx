// ARQUIVO: src\pages\Home.jsx
// CAMINHO RELATIVO: ./pages/Home.jsx

import { useState, useEffect, useRef, useCallback } from "react" // Importa hooks do React
import MovieCard from "../components/MovieCard" // Importa componente MovieCard para exibir cada filme
import './MoviesGrid.sass' // Importa estilos Sass para a página

const moviesURL = import.meta.env.VITE_API // Obtém URL base da API de filmes de variável de ambiente Vite
const apiKey = import.meta.env.VITE_API_KEY // Obtém chave da API de variável de ambiente Vite

const Home = () => { // Define componente funcional Home (Página inicial)
    const [topMovies, setTopMovies] = useState([]) // Estado para armazenar lista de filmes mais bem avaliados
    const [page, setPage] = useState(1) // Estado para controlar página atual na paginação infinita
    const [loading, setLoading] = useState(false) // Estado para controlar se está carregando mais filmes
    const [hasMore, setHasMore] = useState(true) // Estado para controlar se há mais páginas para carregar
    const [restored, setRestored] = useState(false) // Estado para controlar se a posição do scroll já foi restaurada
    const loader = useRef(null) // Ref para o elemento que será observado para carregar mais filmes (scroll infinito)

    // Função assíncrona para buscar filmes mais bem avaliados da API
    const getTopRatedMovies = async (pageNum) => {
        setLoading(true) // Ativa estado de carregamento

        const url = `${moviesURL}top_rated?${apiKey}&page=${pageNum}&language=pt-BR` // Monta URL da API com página e idioma
        const response = await fetch(url) // Faz requisição à API
        const data = await response.json() // Converte resposta para JSON

        setTopMovies(prev => [...prev, ...data.results]) // Adiciona novos filmes ao estado existente

        // Se não houver resultados ou chegou à última página, define que não há mais para carregar
        if (data.results.length === 0 || pageNum >= data.total_pages) {
            setHasMore(false)
        }
        
        setLoading(false) // Desativa estado de carregamento
    }

    useEffect(() => {
        document.title = "Catálogo de Filmes" // Define título da página
    }, []) // Executa apenas uma vez ao montar o componente

    useEffect(() => {
        // Se ainda há mais páginas, busca filmes da página atual
        if (hasMore) {
            getTopRatedMovies(page)
        }
    }, [page, hasMore]) // Executa sempre que 'page' ou 'hasMore' mudar

    // Função callback para o Intersection Observer (observa quando o elemento de carregamento aparece na tela)
    const handleObserver = useCallback((entries) => {
        const target = entries[0] // Pega o primeiro elemento observado (no caso, o loader)

        // Se o elemento está visível, não está carregando e há mais filmes, carrega próxima página
        if (target.isIntersecting && !loading && hasMore) {
            setPage(prev => prev + 1) // Incrementa página
        }
    }, [loading, hasMore]) // Dependências: função é recriada se loading ou hasMore mudarem

    useEffect(() => {
        // Configurações do Intersection Observer
        const option = {
            root: null, // Observa em relação à viewport
            rootMargin: "20px", // Margem ao redor da viewport
            threshold: 1.0 // 100% do elemento precisa estar visível
        }

        const observer = new IntersectionObserver(handleObserver, option) // Cria observer

        // Se o elemento loader existir, começa a observá-lo
        if (loader.current) observer.observe(loader.current)
        
        // Função de limpeza: para de observar o loader quando componente desmonta
        return () => {
            if (loader.current) observer.unobserve(loader.current)
        }
    }, [handleObserver]) // Executa sempre que handleObserver mudar

    // Efeito para restaurar posição do scroll salva no histórico
    useEffect(() => {
        if (!restored && topMovies.length > 0) { // Se ainda não restaurou e já tem filmes
            const savedPosition = history.state?.scrollPosition // Pega posição salva no estado do histórico
            if (savedPosition !== undefined) { // Se existir posição salva
                setTimeout(() => { // Aguarda 100ms para garantir renderização
                    window.scrollTo(0, savedPosition) // Rola para posição salva
                }, 100)
                setRestored(true) // Marca como restaurado
            }
        }
    }, [topMovies, restored]) // Executa quando topMovies ou restored mudarem
    
    return (
        // Fragmento React
        <>
            <div className="container">
                <div className="movies-container">
                    {/* Exibe mensagem de carregamento inicial se não houver filmes */}
                    {topMovies.length === 0 && <p className="alert">Carregando...</p>}
                    {/* Mapeia cada filme para um componente MovieCard */}
                    {topMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
            {/* Elemento observado para scroll infinito (loader) */}
            <div ref={loader}>
                {/* Exibe carregando durante busca */}
                {loading && <p className="alert">Carregando...</p>}
                {/* Exibe mensagem quando não há mais resultados */}
                {!loading && !hasMore && <p className="alert">Sem mais resultados</p>}
            </div>
        </>
    )
}

export default Home // Exporta componente como padrão