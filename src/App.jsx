// ARQUIVO: src\App.jsx
// CAMINHO RELATIVO: ./App.jsx

import { Outlet } from 'react-router-dom' // Importa Outlet para renderizar as rotas filhas
import './App.sass' // Importa estilos específicos do componente App
import Navbar from './components/Navbar' // Importa componente Navbar (barra de navegação)
import Footer from './components/Footer' // Importa componente Footer (rodapé)
import ScrollToTopButton from './components/ScrollToTopButton' // Importa botão para rolar até o topo
import useScrollRestoration from './hooks/useScrollRestoration' // Importa hook personalizado para restauração de rolagem
import React, { useEffect } from 'react' // Importa React e o hook useEffect

function App() { // Define o componente principal App
  useEffect(()=> { // Hook useEffect para executar código ao montar o componente
    // Verifica se o navegador suporta a propriedade scrollRestoration no histórico
    if ('scrollRestoration' in window.history) {
      // Altera o comportamento padrão de rolagem do navegador para manual
      window.history.scrollRestoration = "manual"
    }
  }, []) // Array de dependências vazio: executa apenas uma vez ao montar

  useScrollRestoration() // Chama o hook personalizado para gerenciar a restauração da rolagem

  return (
    // Fragmento React para retornar múltiplos elementos sem um nó pai extra
    <>
      <div className="app-container"> {/* Container principal da aplicação */}
        <Navbar /> {/* Renderiza a barra de navegação */}
        <div className="content"> {/* Div que envolve o conteúdo principal (onde as páginas serão renderizadas) */}
          <Outlet /> {/* Outlet: posição onde as rotas filhas serão renderizadas */}
        </div>
        <Footer /> {/* Renderiza o rodapé */}
        <ScrollToTopButton /> {/* Renderiza o botão de rolar para o topo (aparece condicionalmente) */}
      </div>
    </>
  )
}

export default App // Exporta o componente App como padrão