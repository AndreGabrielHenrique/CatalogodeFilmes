// ARQUIVO: src\components\Navbar.jsx
// CAMINHO RELATIVO: ./components/Navbar.jsx

import { Link, useNavigate } from 'react-router-dom' // Importa Link para navegação e useNavigate para navegação programática
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi' // Importa ícones da biblioteca react-icons
import './Navbar.sass' // Importa estilos Sass específicos
import { useState } from 'react' // Importa hook useState para gerenciamento de estado

const Navbar = () => { // Define componente funcional Navbar (Barra de Navegação)
    const [search, setSearch] = useState('') // Estado para armazenar valor da busca, inicializado como string vazia
    const navigate = useNavigate() // Hook para navegação programática

    const handleSearch = (e) => { // Função chamada ao enviar formulário de busca
        e.preventDefault() // Previne comportamento padrão do formulário (recarregar página)

        if(!search) return // Se busca estiver vazia, retorna sem fazer nada

        navigate(`/search?q=${search}`) // Navega para rota /search com query parameter 'q' contendo valor da busca
        setSearch('') // Limpa campo de busca após navegação
    }

    return (
        // Fragmento React
        <>
            <div>
                {/* Elemento nav com id "navbar" para estilização */}
                <nav id="navbar">
                    {/* Título h2 com link para página inicial (rota "/") */}
                    <h2>
                        <Link to="/">
                            <BiCameraMovie /> {/* Ícone de câmera */}
                            Catálogo de Filmes {/* Texto do link */}
                        </Link>
                    </h2>
                    {/* Formulário de busca: onSubmit chama handleSearch quando enviado */}
                    <form onSubmit={handleSearch}>
                        {/* Input controlado: value sempre igual ao estado search, onChange atualiza estado */}
                        <input type="text" placeholder="Buscar um filme" onChange={(e)=> setSearch(e.target.value)} value={search} />
                        {/* Botão do tipo submit para enviar formulário */}
                        <button type="submit">
                            <BiSearchAlt2 /> {/* Ícone de lupa */}
                        </button>
                    </form>
                </nav>
            </div>
        </>
    )
  }
  
  export default Navbar // Exporta componente como padrão