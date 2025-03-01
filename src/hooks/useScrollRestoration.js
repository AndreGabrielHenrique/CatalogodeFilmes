import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useScrollRestoration=()=> {
  const { pathname } = useLocation()

  useEffect(()=> {
    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`)
    if (savedPosition !== null) {
      setTimeout(()=> {
        window.scrollTo(0, parseInt(savedPosition, 10))
      }, 100)
    }

    const handleSaveScroll=()=> {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY)
    }

    window.addEventListener("beforeunload", handleSaveScroll)
    window.addEventListener("popstate", handleSaveScroll)

    return ()=> {
      handleSaveScroll()
      window.removeEventListener("beforeunload", handleSaveScroll)
      window.removeEventListener("popstate", handleSaveScroll)
    }
  }, [pathname])
}

export default useScrollRestoration