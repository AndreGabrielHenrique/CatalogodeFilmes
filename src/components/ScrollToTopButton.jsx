// ARQUIVO: src\components\ScrollToTopButton.jsx
// CAMINHO RELATIVO: ./components/ScrollToTopButton.jsx

import { useState, useEffect } from "react" // Importa hooks useState e useEffect

const ScrollToTopButton = () => { // Define componente funcional ScrollToTopButton (Botão de Rolar para o Topo)
  const [isVisible, setIsVisible] = useState(false) // Estado para controlar visibilidade do botão (inicialmente false)

  const toggleVisibility = () => { // Função para alternar visibilidade baseada na posição do scroll
    if (window.pageYOffset > 300) { // Se posição vertical do scroll for maior que 300 pixels
      setIsVisible(true) // Torna botão visível
    }
    else { // Caso contrário
      setIsVisible(false) // Oculta botão
    }
  }

  const scrollToTop = () => { // Função para rolar suavemente até o topo
    window.scrollTo({ // Método para rolar janela
      top: 0, // Posição desejada: topo (0 pixels)
      behavior: "smooth" // Animação suave
    })
  }

  useEffect(()=> { // Hook useEffect para adicionar e remover event listener
    window.addEventListener("scroll", toggleVisibility) // Adiciona listener de evento scroll ao montar componente
    return ()=> window.removeEventListener("scroll", toggleVisibility) // Remove listener ao desmontar componente (cleanup)
  }, []) // Array de dependências vazio: executa apenas na montagem

  return (
    // Renderiza botão apenas se isVisible for true
    isVisible && (
      // Botão com classe para estilização e evento onClick que chama scrollToTop
      <button className="scroll-to-top-button" onClick={scrollToTop}>
        ↑ {/* Seta para cima como conteúdo do botão */}
      </button>
    )
  )
}

export default ScrollToTopButton // Exporta componente como padrão