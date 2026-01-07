// ARQUIVO: src\components\MovieCard.jsx
// CAMINHO RELATIVO: ./components/MovieCard.jsx

import { Link } from "react-router-dom" // Importa componente Link para navegação sem recarregar página
import { FaStar } from "react-icons/fa" // Importa ícone de estrela da biblioteca react-icons

const imageUrl = import.meta.env.VITE_IMG // Obtém URL base para imagens da variável de ambiente Vite

const MovieCard = ({ movie, showLink = true }) => { // Define componente MovieCard que recebe props: movie (objeto) e showLink (booleano com valor padrão true)
    const handleSaveScroll = () => { // Função para salvar posição atual do scroll no histórico
        const scrollPosition = window.scrollY // Obtém posição vertical atual do scroll
        const currentState = history.state || {} // Obtém estado atual do histórico ou objeto vazio
        history.replaceState({ ...currentState, scrollPosition }, '') // Atualiza estado do histórico mantendo dados existentes e adicionando scrollPosition
    }

    return (
        // Fragmento React
        <>
            {/* Div principal com classe para estilização do cartão do filme */}
            <div className="movie-card">
                {/* Imagem do pôster: concatena URL base com caminho do pôster. Alt usa título do filme */}
                <img src={imageUrl + movie.poster_path} alt={movie.title} />
                {/* Título do filme em elemento h3 */}
                <h3>{movie.title}</h3>

                {/* Renderiza avaliação apenas se vote_average for maior que 0 */}
                {movie.vote_average > 0 && (
                    <p>
                        <FaStar /> {/* Ícone de estrela */}
                        {movie.vote_average} {/* Média de votos */}
                    </p>
                )}
                {/* Renderiza link "Ver detalhes" apenas se showLink for true */}
                {showLink && <Link to={`/movie/${movie.id}`} onClick={handleSaveScroll} state={{ from: window.location.pathname }}>Ver detalhes</Link>}
            </div>
        </>
    )
}

export default MovieCard // Exporta componente como padrão