// ARQUIVO: src\pages\Movie.jsx
// CAMINHO RELATIVO: ./pages/Movie.jsx

import { useState, useEffect } from "react" // Importa hooks do React
import { useParams, useNavigate, useLocation } from "react-router-dom" // Importa hooks do React Router
// Importa ícones da biblioteca react-icons/bs
import { 
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
    BsCalendar,
    BsClipboard,
    BsTranslate,
    BsGlobe } from "react-icons/bs"
import './Movie.sass' // Importa estilos Sass para a página de detalhes do filme
import MovieCard from "../components/MovieCard" // Importa componente MovieCard para exibir o filme
import useCountryTranslation from "../hooks/useCountryTranslation" // Importa hook personalizado para traduzir países

const moviesURL = import.meta.env.VITE_API // Obtém URL base da API de filmes
const apiKey = import.meta.env.VITE_API_KEY // Obtém chave da API
const conversionRate = 5.0 // Taxa de conversão de dólar para real (valor fixo para exemplo)

const Movie = () => { // Define componente funcional Movie (Página de detalhes do filme)
    const { id } = useParams() // Obtém parâmetro ID da URL (ex: /movie/123)
    const navigate = useNavigate() // Hook para navegação programática
    const location = useLocation() // Hook para obter informações da rota atual
    const canGoBack = location.state && location.state.from ? true : false // Verifica se há estado de navegação para voltar
    const [movie, setMovie] = useState(null) // Estado para armazenar dados do filme
    const { translateCountry } = useCountryTranslation() // Hook para traduzir nomes de países

    useEffect(() => {
        // Define título da página com nome do filme, se disponível
        document.title = movie ? `Detalhes do filme ${movie.title}` : "Detalhes do filme"
    }, [id, movie]) // Executa quando ID ou movie mudam

    // Função assíncrona para buscar dados do filme na API
    const getMovie = async (url) => {
        const response = await fetch(url) // Faz requisição à API
        const data = await response.json() // Converte resposta para JSON
        setMovie(data) // Atualiza estado com dados do filme
    }

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR` // Monta URL da API com ID e idioma
        getMovie(movieUrl) // Busca dados do filme
    }, [id]) // Executa quando ID muda

    // Função para formatar valores monetários (converte dólar para real)
    const formatCurrency = (number) => {
        const converted = number * conversionRate // Converte usando taxa fixa
        return converted.toLocaleString('pt-BR', { // Formata como moeda brasileira
            style: 'currency',
            currency: 'BRL'
        })
    }

    // Função para formatar datas (de YYYY-MM-DD para DD/MM/YYYY)
    const formatDate = (dateString) => {
        if (!dateString) return '' // Se não houver data, retorna string vazia

        const date = new Date(dateString) // Cria objeto Date
        const day = date.getDate().toString().padStart(2, '0') // Obtém dia com 2 dígitos
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // Obtém mês com 2 dígitos
        const year = date.getFullYear() // Obtém ano

        return `${day}/${month}/${year}` // Retorna data formatada
    }

    return (
        // Fragmento React
        <>
            <div className="movie-page">
                {/* Botão "Voltar" condicional: aparece apenas se canGoBack for true */}
                {canGoBack && (
                    <a className="back-page" onClick={() => navigate(-1)}> {/* Navega para página anterior */}
                        Voltar à página anterior
                    </a>
                )}
                {/* Renderiza conteúdo apenas se movie existir */}
                {movie && (
                    <>
                        {/* Exibe cartão do filme sem link "Ver detalhes" (já está na página de detalhes) */}
                        <MovieCard movie={movie} showLink={false} />
                        {/* Exibe tagline se existir e não estiver vazio */}
                        {movie.tagline && movie.tagline.trim() !== "" && (
                            <p className="tagline">{movie.tagline}</p>
                        )}
                        {/* Exibe título original se diferente do título em português */}
                        {movie.original_title && movie.original_title !== movie.title && (
                            <div className="info">
                                <h4>
                                    <BsTranslate /> Título original {/* Ícone de tradução */}
                                </h4>
                                <p>
                                    {movie.original_title}
                                </p>
                            </div>
                        )}
                        {/* Exibe país(es) de origem se existirem */}
                        {movie.production_countries && movie.production_countries.length > 0 && (
                            <div className="info">
                                <h4>
                                    <BsGlobe /> País de origem {/* Ícone de globo */}
                                </h4>
                                <p>
                                    {/* Mapeia cada país, traduzindo seu nome */}
                                    {movie.production_countries.map ((country, index) => (
                                        <span key={index}>
                                            {translateCountry(country.name)} {/* Traduz nome do país */}
                                            {/* Adiciona vírgula entre países, exceto no último */}
                                            {index < movie.production_countries.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                        {/* Exibe data de lançamento se existir */}
                        {movie.release_date && (
                            <div className="info">
                                <h4>
                                    <BsCalendar /> Data de lançamento {/* Ícone de calendário */}
                                </h4>
                                <p>{formatDate(movie.release_date)}</p> {/* Data formatada */}
                            </div>
                        )}
                        {/* Exibe gêneros se existirem */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="info">
                                <h4>
                                    <BsClipboard /> Gênero {/* Ícone de prancheta */}
                                </h4>
                                <p>
                                    {/* Mapeia cada gênero */}
                                    {movie.genres.map ((genre, index) => (
                                        <span key={index}>
                                            {genre.name} {/* Nome do gênero */}
                                            {/* Adiciona vírgula entre gêneros, exceto no último */}
                                            {index < movie.genres.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                        {/* Exibe orçamento se maior que 0 */}
                        {movie.budget > 0 && (
                            <div className="info">
                                <h4>
                                    <BsWallet2 /> Orçamento {/* Ícone de carteira */}
                                </h4>
                                <p>{formatCurrency(movie.budget)}</p> {/* Orçamento formatado em reais */}
                            </div>
                        )}
                        {/* Exibe faturamento se maior que 0 */}
                        {movie.revenue > 0 && (
                            <div className="info">
                                <h4>
                                    <BsGraphUp /> Faturamento {/* Ícone de gráfico */}
                                </h4>
                                <p>{formatCurrency(movie.revenue)}</p> {/* Faturamento formatado em reais */}
                            </div>
                        )}
                        {/* Exibe duração se maior que 0 */}
                        {movie.runtime > 0 && (
                            <div className="info">
                                <h4>
                                    <BsHourglassSplit /> Duração {/* Ícone de ampulheta */}
                                </h4>
                                <p>{movie.runtime} minutos</p>
                            </div>
                        )}
                        {/* Exibe sinopse se existir e não for "Sem sinopse" */}
                        {movie.overview && movie.overview !== "Sem sinopse" && (
                            <div className="info description">
                                <h4>
                                    <BsFillFileEarmarkTextFill /> Sinopse {/* Ícone de documento */}
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

export default Movie // Exporta componente como padrão