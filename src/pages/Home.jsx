import { useState, useEffect, useRef, useCallback } from "react"
import MovieCard from "../components/MovieCard"
import './MoviesGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home=()=> {
    const [topMovies, setTopMovies] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [restored, setRestored] = useState(false)
    const loader = useRef(null)

    const getTopRatedMovies = async (pageNum)=> {
        setLoading(true)

        const url = `${moviesURL}top_rated?${apiKey}&page=${pageNum}&language=pt-BR`
        const response = await fetch(url)
        const data = await response.json()

        setTopMovies(prev => [...prev, ...data.results])

        if (data.results.length === 0 || pageNum >= data.total_pages) {
            setHasMore(false)
        }
        
        setLoading(false)
    }

    useEffect(()=> {
        document.title = "Catálogo de Filmes"
    }, [])

    useEffect(()=> {
        if (hasMore) {
            getTopRatedMovies(page)
        }
    }, [page, hasMore])
    
    const handleObserver = useCallback((entries)=> {
        const target = entries[0]

        if (target.isIntersecting && !loading && hasMore) {
            setPage(prev => prev + 1)
        }
    }, [loading, hasMore])
    
    useEffect(()=> {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        }

        const observer = new IntersectionObserver(handleObserver, option)

        if (loader.current) observer.observe(loader.current)
        return ()=> {
            if (loader.current) observer.unobserve(loader.current)
        }
    }, [handleObserver])

    useEffect(()=> {
        if (!restored && topMovies.length > 0) {
            const savedPosition = history.state?.scrollPosition
            if (savedPosition !== undefined) {
                setTimeout(()=> {
                    window.scrollTo(0, savedPosition);
                }, 100)
                setRestored(true)
            }
        }
      }, [topMovies, restored])
    
    return (
        <>
            <div className="container">
                <div className="movies-container">
                    {topMovies.length === 0 && <p className="alert">Carregando...</p>}
                    {topMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                ))}
                </div>
            </div>
            <div ref={loader}>
                {loading && <p className="alert">Carregando...</p>}
                {!loading && !hasMore && <p className="alert">Sem mais resultados</p>}
            </div>
        </>
    )
}

export default Home