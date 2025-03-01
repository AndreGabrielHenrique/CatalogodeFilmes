import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import useScrollRestoration from './hooks/useScrollRestoration'
import { useEffect } from 'react'

function App() {
  useEffect(()=> {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  useScrollRestoration()

  return (
    <>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  )
}

export default App