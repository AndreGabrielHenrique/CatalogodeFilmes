import { useState,useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { 
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
    BsCalendar,
    BsClipboard,
    BsTranslate,
    BsGlobe  } from "react-icons/bs"
import './Movie.css'
import MovieCard from "../components/MovieCard"
import useCountryTranslation from "../hooks/useCountryTranslation"


const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const conversionRate = 5.0

const Movie=()=> {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const canGoBack = location.state && location.state.from ? true : false
    const [movie, setMovie] = useState(null)
    const { translateCountry } = useCountryTranslation()

    useEffect(()=> {
        document.title = movie ? `Detalhes do filme ${movie.title}` : "Detalhes do filme"
    }, [id, movie])

    const getMovie = async (url)=> {
        const response = await fetch(url)
        const data = await response.json()
        setMovie(data)
    }

    useEffect(()=> {
        const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`
        getMovie(movieUrl)
    },[id])

    const formatCurrency=(number)=> {
        const converted = number * conversionRate;
        return converted.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    const formatDate = (dateString)=> {
        if (!dateString) return ''

        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }

    return (
      <>
        <div className="movie-page">
            {canGoBack && (
                <a className="back-page" onClick={()=> navigate(-1)}>
                    Voltar à página anterior
                </a>
            )}
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    {movie.tagline && movie.tagline.trim() !== "" && (
                        <p className="tagline">{movie.tagline}</p>
                    )}
                    {movie.original_title && movie.original_title !== movie.title && (
                        <div className="info">
                            <h4>
                                <BsTranslate /> Título original
                            </h4>
                            <p>
                                {movie.original_title}
                            </p>
                        </div>
                    )}
                    {movie.production_countries && movie.production_countries.length > 0 && (
                        <div className="info">
                            <h4>
                                <BsGlobe /> País de origem
                            </h4>
                            <p>
                                {movie.production_countries.map ((country, index)=> (
                                    <span key={index}>
                                        {translateCountry(country.name)}
                                        {index < movie.production_countries.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}
                    {movie.release_date && (
                        <div className="info">
                            <h4>
                                <BsCalendar /> Data de lançamento
                            </h4>
                            <p>{formatDate(movie.release_date)}</p>
                        </div>
                    )}
                    {movie.genres && movie.genres.length > 0 && (
                        <div className="info">
                            <h4>
                                <BsClipboard /> Gênero
                            </h4>
                            <p>
                                {movie.genres.map ((genre, index)=> (
                                    <span key={index}>
                                        {genre.name}
                                        {index < movie.genres.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}
                    {movie.budget > 0 && (
                        <div className="info">
                            <h4>
                                <BsWallet2 /> Orçamento
                            </h4>
                            <p>{formatCurrency(movie.budget)}</p>
                        </div>
                    )}
                    {movie.revenue > 0 && (
                        <div className="info">
                            <h4>
                                <BsGraphUp /> Faturamento
                            </h4>
                            <p>{formatCurrency(movie.revenue)}</p>
                        </div>
                    )}
                    {movie.runtime > 0 && (
                        <div className="info">
                            <h4>
                                <BsHourglassSplit /> Duração
                            </h4>
                            <p>{movie.runtime} minutos</p>
                        </div>
                    )}
                    {movie.overview && movie.overview !== "Sem sinopse" && (
                        <div className="info description">
                            <h4>
                                <BsFillFileEarmarkTextFill /> Sinopse
                            </h4>
                            <p>{movie.overview}</p>
                        </div>
                    )}
                </>
            )}
        </div>
      </>
    )
  }
  
  export default Movie