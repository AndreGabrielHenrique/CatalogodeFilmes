import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'

function App() {
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