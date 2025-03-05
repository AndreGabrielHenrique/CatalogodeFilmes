import { useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import './MoviesGrid.css'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search=()=> {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [restored, setRestored] = useState(false)
  const loader = useRef(null)

  useEffect(() => {
    document.title = `Resultados da busca por ${query}`
  }, [query])

  useEffect(()=> {
    setMovies([])
    setPage(1)
    setHasMore(true)
  }, [query])

  const getSearchedMovies = async (pageNum)=> {
    setLoading(true)

    const url = `${searchURL}?${apiKey}&query=${query}&page=${pageNum}&language=pt-BR`
    const response = await fetch(url)
    const data = await response.json()

    setMovies(prev => [...prev, ...data.results])

    if (data.results.length === 0 || pageNum >= data.total_pages) {
      setHasMore(false)
    }

    setLoading(false)
  }

  useEffect(()=> {
    if (query) {
      getSearchedMovies(page)
    }
  }, [page, query])

  const handleObserver = useCallback((entries)=> {
    const target = entries[0]

    if (target.isIntersecting && !loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [loading, hasMore])

  useEffect(()=> {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    }

    const observer = new IntersectionObserver(handleObserver, options)

    if (loader.current) observer.observe(loader.current)
    return ()=> {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [handleObserver])

  useEffect(()=> {
    if (!restored && movies.length > 0) {
      const savedPosition = history.state?.scrollPosition
      if (savedPosition !== undefined) {
          setTimeout(()=> {
              window.scrollTo(0, savedPosition)
          }, 100)
          setRestored(true)
      }
    }
  }, [movies, restored])

  return (
    <>
      <div className="container">
        <h2 className="title">
            Resultados da busca por <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
            {movies.length === 0 && loading && <p className="alert">Carregando...</p>}
            {movies.length === 0 && !loading && <p className="alert nenhum-resultado">Nenhum resultado</p>}
            {movies.length > 0 && movies.map((movie)=>
                <MovieCard key={movie.id} movie={movie} />
          )}
        </div>
      </div>
      <div ref={loader}>
        {loading && <p className="alert">Carregando...</p>}
        {!loading && !hasMore && movies.length > 0 && <p className="alert">Sem mais resultados</p>}
      </div>
    </>
  )
}

export default Search