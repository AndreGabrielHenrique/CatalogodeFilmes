// ARQUIVO: src\components\Footer.jsx
// CAMINHO RELATIVO: ./components/Footer.jsx

import './Footer.sass' // Importa o arquivo de estilos Sass específico para este componente

const Footer = () => { // Define o componente funcional Footer (Rodapé)
    return (
      // Fragmento React para agrupar elementos sem adicionar nó extra ao DOM
      <>
        {/* Div principal com id "footer" para estilização e identificação */}
        <div id="footer">
            {/* Título com mensagem informativa sobre o propósito educacional da página */}
            <h1>Esta página foi desenvolvida para o intuito de aprendizado em React.</h1>
        </div>
      </>
    )
  }
  
  export default Footer // Exporta o componente como padrão para uso em outros arquivos