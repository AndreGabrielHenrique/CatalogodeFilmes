import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"

const imageUrl = import.meta.env.VITE_IMG 

const MovieCard=({movie, showLink = true})=> {
    const handleSaveScroll=()=> {
        sessionStorage.setItem('scrollPosition', window.scrollY)
    }

    return (
        <>
            <div className="movie-card">
                <img src={imageUrl + movie.poster_path} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>
                    <FaStar /> {movie.vote_average}
                </p>
                {showLink && <Link to={`/movie/${movie.id}`} onClick={handleSaveScroll}>Ver detalhes</Link>}  
            </div>            
        </>
    )
}

export default MovieCard