// ARQUIVO: vite.config.js
// CAMINHO RELATIVO: ./vite.config.js

// Importa a função defineConfig do Vite para configurar o projeto
import { defineConfig } from 'vite'
// Importa o plugin do React para o Vite
import react from '@vitejs/plugin-react'

// Exporta a configuração do Vite
export default defineConfig({
  plugins: [ // Lista de plugins
    react(), // Plugin do React para habilitar o suporte a JSX e React
  ]
})