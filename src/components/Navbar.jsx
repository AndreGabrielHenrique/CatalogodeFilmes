import { Link, useNavigate } from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'
import './Navbar.css'
import { useState } from 'react'

const Navbar=()=> {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSearch=(e)=> {
        e.preventDefault()

        if(!search) return

        navigate(`/search?q=${search}`)
        setSearch('')
    }

    return (
      <>
        <div>
            <nav id="navbar">
                <h2>
                    <Link to="/">
                        <BiCameraMovie /> Catálogo de Filmes
                    </Link>
                </h2>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Buscar um filme" onChange={(e)=> setSearch(e.target.value)} value={search} />
                    <button type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
            </nav>
        </div>
      </>
    )
  }
  
  export default Navbar