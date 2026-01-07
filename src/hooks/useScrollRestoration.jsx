// ARQUIVO: src\hooks\useScrollRestoration.jsx
// CAMINHO RELATIVO: ./hooks/useScrollRestoration.jsx

import { useEffect } from "react" // Importa hook useEffect do React
import { useLocation } from "react-router-dom" // Importa hook useLocation para obter informações da rota atual

// Hook personalizado para restaurar a posição do scroll ao navegar entre páginas
const useScrollRestoration = () => {
  const { pathname } = useLocation() // Obtém o caminho atual da URL (ex: "/movie/123")

  useEffect(() => {
    // Recupera a posição do scroll salva para a rota atual do sessionStorage
    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`)
    
    // Se existir uma posição salva, restaura o scroll após 100ms (para garantir renderização)
    if (savedPosition !== null) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10)) // Scroll para posição Y salva
      }, 100)
    }

    // Função para salvar a posição atual do scroll no sessionStorage
    const handleSaveScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY) // Salva posição Y atual
    }

    // Adiciona event listeners para salvar o scroll:
    window.addEventListener("beforeunload", handleSaveScroll) // Antes de fechar/recarregar página
    window.addEventListener("popstate", handleSaveScroll) // Quando navega com botões do navegador

    // Função de limpeza executada quando o componente é desmontado ou pathname muda
    return () => {
      handleSaveScroll() // Salva a posição atual antes de remover listeners
      window.removeEventListener("beforeunload", handleSaveScroll) // Remove listener
      window.removeEventListener("popstate", handleSaveScroll) // Remove listener
    }
  }, [pathname]) // Executa o efeito sempre que pathname mudar
}

export default useScrollRestoration // Exporta o hook como padrão